import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './Dtos/create-user.dto';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './Dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { Builder, By } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  getAllUsers(): string {
    return 'Hello There';
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const { username, password, ...rest } = createUserDto;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const options = new Options().headless();
    const driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    await driver.get(`https://www.linkedin.com/`);

    const emailInput = await driver.findElement(
      By.xpath("//input[@name='session_key' and @type='text']"),
    );
    await emailInput.sendKeys(process.env.LINKEDIN_EMAIL);

    const passwordInput = await driver.findElement(
      By.xpath("//input[@name='session_password' and @type='password']"),
    );

    await passwordInput.sendKeys(process.env.LINKEDIN_PASSWORD);

    const signInButton = await driver.findElement(
      By.xpath(
        "//button[contains(@class, 'btn-md') and contains(@class, 'btn-primary') and contains(@class, 'flex-shrink-0') and contains(@class, 'cursor-pointer') and contains(@class, 'sign-in-form__submit-btn--full-width')]",
      ),
    );

    await signInButton.click();

    await driver.get(`https://www.linkedin.com/in/${username}/`);

    const userImg = await driver.findElement(
      By.xpath(
        "//img[contains(@class, 'pv-top-card-profile-picture__image') and contains(@class, 'pv-top-card-profile-picture__image--show') and contains(@class, 'evi-image') and contains(@class, 'ember-view')]",
      ),
    );

    const userBody = await driver.findElement(
      By.xpath(
        "//div[contains(@class, 'text-body-medium') and contains(@class, 'break-words')]",
      ),
    );

    const userBio = await userBody.getText();

    const userImageSrc = await userImg.getAttribute('src');
    const fullName = await driver.getTitle();

    const names = fullName.split(' - ')[0].split(' ');
    const firstTwoNames = names.slice(0, 2).join(' ');

    console.log(userImageSrc);
    console.log(firstTwoNames);

    if (!firstTwoNames) {
      throw new BadRequestException('Could not determine username');
    }

    const user = await this.usersService.create({
      ...rest,
      username: username || firstTwoNames,
      password: hashedPassword,
      image: userImageSrc,
      fullName: firstTwoNames,
      ...(userBio && { bio: userBio }),
    });
    const payload = {
      username: user.username,
      userId: user.id,
      image: user.image,
      fullName: user.fullName,
    };
    return {
      userId: user.id,
      username: user.username,
      image: user.image,
      fullName: user.fullName,
      access_token: this.jwtService.sign(payload),
    };
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.usersService.validateUser(loginUserDto);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = {
      username: user.username,
      userId: user.id,
      image: user.image,
      fullName: user.fullName,
    };
    const userData = await this.usersService.getUserData(user.id);

    const userResponse = {
      userId: userData._id,
      username: userData.username,
      image: userData.image,
      fullName: userData.fullName,
    };

    return {
      ...userResponse,
      access_token: this.jwtService.sign(payload),
    };
  }
}
