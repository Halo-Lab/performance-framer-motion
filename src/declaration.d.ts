declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.md';

declare module '!raw-loader!*' {
  const content: string;
  export default content;
}
