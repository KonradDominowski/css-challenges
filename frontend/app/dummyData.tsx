import HTML5Logo from "./../media/HTML5Logo.svg";
import CSSLogo from "./../media/CSSLogo.svg";

export interface Section {
  title: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
  slug: string;
  disabled?: boolean;
}

const sections: Section[] = [
  {
    title: "HTML Basics",
    description: "Get to know the fundamentals of Hypertext Markup Language",
    logoSrc: HTML5Logo,
    logoAlt: "HTML5 logo",
    slug: "html-basics",
  },
  {
    title: "CSS Basics",
    description: "Learn how to style HTML using Cascading Style Sheets",
    logoSrc: CSSLogo,
    logoAlt: "CSS logo",
    disabled: true,
    slug: "css-basics",
  },
];

export default sections;
