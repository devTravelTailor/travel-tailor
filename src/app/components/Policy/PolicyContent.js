import React from "react";
import { slugify } from "../../util/slugify";
import styles from "./content.module.css";

const PolicyContent = ({ sections }) => {
  if (!sections || sections.length === 0) {
    return (
      <div className={styles.emptyContent}>
        <p>No policy content available.</p>
      </div>
    );
  }

  // Helper function to format content with basic HTML support
  const formatContent = (content) => {
    if (!content) return "";

    const parseText = (text) => {
      // Handle bold text: **bold**
      let parts = text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
        if (/^\*\*.*\*\*$/.test(part)) {
          return <strong key={`b-${i}`}>{part.slice(2, -2)}</strong>;
        }

        // Handle links like \l\Link Text|https://example.com
        return part.split(/(\\l\\.*?\|.*?)(?=\s|$)/g).map((chunk, j) => {
          if (/^\\l\\.*?\|.*$/.test(chunk)) {
            const [text, href] = chunk.slice(3).split("|");
            return (
              <span key={`l-${i}-${j}`}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkIn}
                >
                  {text}
                </a>
              </span>
            );
          }
          return <span key={`t-${i}-${j}`}>{chunk}</span>;
        });
      });

      // Flatten nested arrays
      return parts.flat();
    };

    return content
      .split("\n\n") // Paragraphs
      .map((paragraph, index) => {
        const lines = paragraph.split("\n"); // Line breaks within paragraph
        return (
          <p key={index} className={styles.contentParagraph}>
            {lines.map((line, i) => (
              <React.Fragment key={i}>
                {parseText(line.trim())}
                {i !== lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      });
  };

  return (
    <div className={styles.contentContainer}>
      {sections.map((section, index) => {
        const slug = slugify(section.title);

        return (
          <section key={slug} id={slug} className={styles.contentSection}>
            <div className={styles.sectionHeader}>
              {/* <span className={styles.sectionNumber}>{index + 1}.</span> */}
              <h2 className={styles.sectionTitle}>{section.title}</h2>
            </div>

            <div className={styles.sectionContent}>
              {typeof section.content === "string"
                ? formatContent(section.content)
                : section.content}
            </div>

            {/* Add some spacing between sections except for the last one */}
            {index < sections.length - 1 && (
              <div className={styles.sectionDivider} />
            )}
          </section>
        );
      })}

      {/* Footer spacing */}
      <div className={styles.contentFooter}>
        <p className={styles.lastUpdated}>
          {/* Last updated: {new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })} */}
          Last updated: August 30, 2024
        </p>
      </div>
    </div>
  );
};

export default PolicyContent;
