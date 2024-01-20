import { useRef } from "react";
const useScrollBlock = () => {
  const scrollBlocked = useRef(false);

  const blockScroll = () => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const { body } = document;

    if (!body?.style || scrollBlocked.current) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue("padding-right")
      ) || 0;

    html.style.position = "relative";
    html.style.overflow = "hidden";
    body.style.position = "relative";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    scrollBlocked.current = true;
  };

  const allowScroll = () => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const { body } = document;

    if (!body?.style || !scrollBlocked.current) return;

    html.style.position = "";
    html.style.overflow = "";
    body.style.position = "";
    body.style.overflow = "";
    body.style.paddingRight = "";

    scrollBlocked.current = false;
  };

  return [blockScroll, allowScroll];
};

export default useScrollBlock;
