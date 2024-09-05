import React, { useState, useEffect } from "react";
import { fetchQuestions } from "../util/quizService";
import { saveAs } from "file-saver";
import Pagination from "../components/Pagination";
import QuestionCard from "../components/QuestionCard";
import DownloadOptions from "../components/DownloadOptions";
import { generatePDF } from "../util/fileService";

const NonTechiesPage = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState("");
  const [loading, setLoading] = useState(false);
  const questionsPerPage = 5;

  useEffect(() => {
    const fetchQuestionsData = async () => {
      try {
        const data = await fetchQuestions(category, difficulty);
        setQuestions(data.questions);
        setCurrentPage(1);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestionsData();
  }, [category, difficulty]);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handleSelectQuestion = (question) => {
    setSelectedQuestions((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  const handleToggleDetails = (question) =>
    setExpandedQuestion((prev) => (prev === question ? null : question));

  const handleDownload = async () => {
    if (!selectedQuestions.length || !downloadFormat) return;

    setLoading(true);
    try {
      let fileContent;
      let fileType;
      let fileName;

      switch (downloadFormat) {
        case "csv":
          fileContent = [
            `"question","answer","options","justification"`,
            ...selectedQuestions.map(
              (q) =>
                `"${q.question}","${q.answer}","${q.options.join(", ")}","${
                  q.justification || ""
                }"`
            ),
          ].join("\n");
          fileType = "text/csv;charset=utf-8;";
          fileName = "questions.csv";
          break;
        case "pdf":
          fileContent = generatePDF(selectedQuestions);
          fileType = "application/pdf";
          fileName = "questions.pdf";
          break;
        default:
          return;
      }

      const blob = new Blob([fileContent], { type: fileType });
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Failed to download file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-4 my-10">
      <h1 className="text-2xl my-2 font-bold">Non-Techies Quiz Questions</h1>
      <div>
        <h1 className="text-2xl mb-5 text-customGreen">
          Select and Download Questions
        </h1>
        <p className="mb-4">
          Welcome to the Non-Techies page! Here, you can easily browse through
          quiz questions, select the ones you like, and download them in your
          preferred format. To get started, simply select a category and
          difficulty level, choose the questions you want to download, and then
          select your download format.
        </p>
      </div>
      <div className="my-5 ">
        <label className="mr-2">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>

        <label className="ml-4 mr-2">Difficulty:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
  <div className="my-5 w-[90%] mx-auto">
  <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
  </div>

      <div className="space-y-4">
        {currentQuestions.map((question) => (
          <QuestionCard
            key={question._id}
            question={question}
            expandedQuestion={expandedQuestion}
            onToggleDetails={handleToggleDetails}
            onSelectQuestion={handleSelectQuestion}
            isSelected={selectedQuestions.includes(question)}
          />
        ))}
      </div>


      <DownloadOptions
        downloadFormat={downloadFormat}
        onFormatChange={setDownloadFormat}
        onDownload={handleDownload}
        isDisabled={!selectedQuestions.length || !downloadFormat}
        loading={loading}
      />
    </section>
  );
};

export default NonTechiesPage;
