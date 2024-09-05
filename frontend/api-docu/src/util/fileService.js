import { jsPDF } from "jspdf";
import { saveAs } from "file-saver";

export const generatePDF = (questions) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;
  const maxLineWidth = pageWidth - margin * 2;
  let y = margin;

  questions.forEach((question, index) => {
    const questionLines = doc.splitTextToSize(`${index + 1}. ${question.question}`, maxLineWidth);
    doc.text(questionLines, margin, y);
    y += questionLines.length * 10;

    const answerText = `Correct Answer: ${question.answer}`;
    const answerLines = doc.splitTextToSize(answerText, maxLineWidth);
    doc.text(answerLines, margin, y);
    y += answerLines.length * 10;

    const optionsText = `Options: ${question.options.join(", ")}`;
    const optionsLines = doc.splitTextToSize(optionsText, maxLineWidth);
    doc.text(optionsLines, margin, y);
    y += optionsLines.length * 10 + 10;

    if (y + 20 > doc.internal.pageSize.getHeight()) {
      doc.addPage();
      y = margin;
    }
  });

  return doc.output("blob");
};

export const downloadFile = (fileContent, fileType, fileName) => {
  const blob = new Blob([fileContent], { type: fileType });
  saveAs(blob, fileName);
};
