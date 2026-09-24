import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify, getNodeText } from "../../util/slugify";
import TableOfContents from "../BlogTOC/TOC";
import styles from "./styles.module.css";
import Image from "next/image";

const Heading = ({ level, children, ...props }) => {
  const text = getNodeText(children);
  const id = slugify(text);
  const Tag = `h${level}`;

  return (
    <Tag id={id} className={styles[`h${level}`]} {...props}>
      {children}
    </Tag>
  );
};

const normalizeHeadingText = (text) =>
  text
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const extractHeadings = (markdown) => {
  const headings = [];
  const seen = new Set();
  const lines = markdown.split("\n");

  const pushHeading = (level, rawText) => {
    const numericLevel = Number(level);
    if (numericLevel < 1 || numericLevel > 6) return;

    const text = normalizeHeadingText(rawText);
    if (!text) return;

    const key = `${numericLevel}:${text.toLowerCase()}`;
    if (seen.has(key)) return;
    seen.add(key);
    headings.push({ level: numericLevel, text });
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;

    const atxMatch = line.match(/^(#{1,6})\s+(.*?)(\s+#+)?$/);
    if (atxMatch) {
      pushHeading(atxMatch[1].length, atxMatch[2]);
      continue;
    }

    const htmlMatch = line.match(/^<h([1-6])[^>]*>(.*?)<\/h\1>$/i);
    if (htmlMatch) {
      pushHeading(htmlMatch[1], htmlMatch[2]);
      continue;
    }

    const nextLine = lines[index + 1]?.trim();
    if (nextLine && /^(-{3,}|={3,})$/.test(nextLine)) {
      const level = nextLine.startsWith("=") ? 1 : 2;
      pushHeading(level, line);
      index += 1;
    }
  }

  return headings;
};

const BlogBody = ({ body }) => {
  const headings = extractHeadings(body);
  const hasToc = headings.length > 0;

  return (
    <div
      className={`${styles.blogLayoutContainer} ${
        hasToc ? "" : styles.blogLayoutContainerNoToc
      }`.trim()}
    >
      {hasToc ? (
        <aside className={styles.tocColumn}>
          <TableOfContents headings={headings} />
        </aside>
      ) : null}

      <div className={styles.contentColumn}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ node, children, ...props }) => (
              <Heading level={1} {...props}>
                {children}
              </Heading>
            ),
            h2: ({ node, children, ...props }) => (
              <Heading level={2} {...props}>
                {children}
              </Heading>
            ),
            h3: ({ node, children, ...props }) => (
              <Heading level={3} {...props}>
                {children}
              </Heading>
            ),
            h4: ({ node, children, ...props }) => (
              <Heading level={4} {...props}>
                {children}
              </Heading>
            ),
            a: ({ node, href, children, ...props }) => {
              if (
                href &&
                (href.startsWith("http://") || href.startsWith("https://"))
              ) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                );
              }
              return (
                <a href={href} {...props}>
                  {children}
                </a>
              );
            },
            img: ({ node, src, alt, ...props }) => {
              let effectiveAlt = alt || "";
              if (!effectiveAlt && src) {
                try {
                  const filename =
                    src.split("/").pop()?.split(".")[0] || "blog image";
                  effectiveAlt = filename.replace(/[-_]/g, " ");
                } catch (e) {
                  effectiveAlt = "blog image";
                }
              }
              return (
                <Image
                  src={src}
                  alt={effectiveAlt}
                  loading="lazy"
                  decoding="async"
                  className={styles.blogImage}
                  {...props}
                  width={1000}
                  height={500}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              );
            },
            p: ({ node, children, ...props }) => (
              <p className={styles.paragraph} {...props}>
                {children}
              </p>
            ),
            ul: ({ node, children, ...props }) => (
              <ul className={styles.list} {...props}>
                {children}
              </ul>
            ),
            ol: ({ node, children, ...props }) => (
              <ol className={styles.list} {...props}>
                {children}
              </ol>
            ),
            li: ({ node, children, ...props }) => (
              <li className={styles.listItem} {...props}>
                {children}
              </li>
            ),
            strong: ({ node, children, ...props }) => (
              <strong className={styles.strong} {...props}>
                {children}
              </strong>
            ),
            blockquote: ({ node, children, ...props }) => (
              <blockquote className={styles.blockquote} {...props}>
                {children}
              </blockquote>
            ),
          }}
        >
          {body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

BlogBody.propTypes = {
  body: PropTypes.string.isRequired,
};

export default BlogBody;
