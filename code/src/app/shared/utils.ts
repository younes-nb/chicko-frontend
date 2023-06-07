export function scrollTo(fragment: string) {
  const yOffset = -100;
  const element = document.getElementById(fragment);
  if (element) {
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({top: y, behavior: 'smooth'});
  }
}
