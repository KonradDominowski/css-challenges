const challenges: Challenge[] = [
  {
    id: 1,
    title: "HTML Basics",
    slug: "html-basics",
    chapters: [
      {
        id: 1,
        title: "Heading",
        tasks: [
          {
            id: 1,
            title: "Heading basic",
            description: `The very first thing you see when you visit a webpage is a heading. Heading are created using the
          <CodeSnippet>{"<h1>"}</CodeSnippet> tag`,
            target: `<html lang="en">
					<body class='testToImage'>
					<div>
					<h1>Hello world</h1>
					</div>
					</body>
					<style></style>
				</html>`,
            submittedCode: ``,
          },
          {
            id: 2,
            title: "Heading second",
            description: `This is a second challenge for a heading section`,
            target: `<html lang="en">
					<body class='testToImage'>
					<div>
					<h1>Hello world</h1>
					</div>
					</body>
					<style></style>
				</html>`,
            submittedCode: ``,
          },
        ],
      },
      {
        id: 2,
        title: "Paragraph",
        tasks: [
          {
            id: 3,
            title: "Paragraph basic",
            description: `The very first thing you see when you visit a webpage is a heading. Heading are created using the
          <CodeSnippet>{"<h1>"}</CodeSnippet> tag`,
            target: `<html lang="en">
					<body class='testToImage'>
					<div>
					<h1>Hello world</h1>
					</div>
					</body>
					<style></style>
				</html>`,
            submittedCode: ``,
          },
          {
            id: 4,
            title: "Paragraph second",
            description: `This is a second challenge for a heading section`,
            target: `<html lang="en">
					<body class='testToImage'>
					<div>
					<h1>Hello world</h1>
					</div>
					</body>
					<style></style>
				</html>`,
            submittedCode: ``,
          },
        ],
      },
    ],
  },
];

export interface Challenge {
  id: number;
  title: string;
  slug: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: number;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  target: string;
  submittedCode: string;
}

export default challenges;
