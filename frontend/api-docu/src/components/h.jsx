// const generateDOCX = async (questions) => {
//     try {
//       const doc = new Document();
//       questions.forEach((question, index) => {
//         doc.addSection({
//           children: [
//             new Paragraph({
//               children: [
//                 new TextRun({
//                   text: `${index + 1}. ${question.question}`,
//                   bold: true,
//                 }),
//               ],
//             }),
//             new Paragraph({
//               text: `Correct Answer: ${question.answer}`,
//             }),
//             new Paragraph({
//               text: `Options: ${question.options.join(", ")}`,
//             }),
//           ],
//         });
//       });
  
//       const blob = await Packer.toBlob(doc);
//       return blob;
//     } catch (error) {
//       console.error("Error generating DOCX file:", error);
//       throw error;
//     }
//   };


