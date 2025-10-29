import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify, getNodeText } from "../../util/slugify";
import TableOfContents from "../BlogTOC/TOC";
import styles from "./styles.module.css";
import Image from "next/image";

// Helper function to extract H2 headings (no changes here)
const extractHeadings = (markdown) => {
  const headings = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const match = line.match(/^##\s+(.*?)(\s+#+)?$/);
    if (match) {
      let text = match[1].trim();
      text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      text = text.replace(/[*_]/g, "");
      headings.push({ level: 2, text });
    }
  }
  return headings;
};

const BlogBody = ({ body }) => {
  const headings = extractHeadings(body);

  return (
    <div className={styles.blogLayoutContainer}>
      <aside className={styles.tocColumn}>
        <TableOfContents headings={headings} />
      </aside>

      <div className={styles.contentColumn}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // --- Heading Renderer (h2) ---
            h2: ({ node, children, ...props }) => {
              const text = getNodeText(children);
              const id = slugify(text);
              return React.createElement(`h2`, { id, ...props }, children);
            },
            // --- Link Renderer ---
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
            // --- Image Renderer ---
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
            // --- Paragraph Renderer ---
            p: ({ node, children, ...props }) => (
              <p className={styles.paragraph} {...props}>
                {children}
              </p>
            ),
            // --- List Renderers ---
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
            // --- Strong/Bold Renderer ---
            strong: ({ node, children, ...props }) => (
              <strong className={styles.strong} {...props}>
                {children}
              </strong>
            ),

            // --- [NEW] Blockquote Renderer ---
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
