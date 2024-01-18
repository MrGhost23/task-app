import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { By, Builder } from 'selenium-webdriver';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.linkedin.com/in/abdullah-nayer/');

  const userImage = await driver.findElement(
    By.className('inline-block relative rounded-[50%] w-16 h-16'),
  );
  const userImageSrc = await userImage.getAttribute('src');

  const fullName = await driver.getTitle();

  const names = fullName.split(' - ')[0].split(' ');
  const firstTwoNames = names.slice(0, 2).join(' ');

  console.log(userImageSrc);
  console.log(firstTwoNames);
  
  await driver.quit();
  await app.listen(5000);
}
bootstrap();
