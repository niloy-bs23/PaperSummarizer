import { useState } from "react";
import openai from "../../../utils/openAi";
import model from "../../../utils/geminiAi";
import parse from "gemini-to-html/parse";
import render from "gemini-to-html/render";
import SquareLoader from "react-spinners/SquareLoader";
import pdfToText from "react-pdftotext";
// import pdfFile from "../../../public/2405.pdf"
import axios from "axios";

export default function () {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [response, setResponse] =
    useState(`"It's impossible to give you a comprehensive overview of "current research in bioinformatics" because it's a vast and constantly evolving field! However, I can give you an idea of some hot areas and key trends:

  **1.  AI and Machine Learning in Bioinformatics:**
  
  * **Drug Discovery and Development:** AI models are being used to analyze massive datasets of molecular structures and predict drug targets, optimize drug design, and accelerate clinical trial processes. 
  * **Disease Diagnosis and Prognosis:** AI algorithms are helping to identify disease biomarkers, predict disease risk, and personalize treatment strategies.  
  * **Genomics and Personalized Medicine:** Machine learning is revolutionizing the analysis of whole-genome sequencing data, enabling better understanding of individual genetic variations and their impact on health.
  
  **2.  Next-Generation Sequencing (NGS) and Big Data Analysis:**
  
  * **Metagenomics and Microbiome Research:** NGS is enabling the study of complex microbial communities, leading to discoveries about human health, agriculture, and environmental science. 
  * **Single-Cell Sequencing:** This technology allows researchers to analyze the genome and transcriptome of individual cells, providing insights into cellular heterogeneity and disease development. 
  * **Epigenomics and Chromatin Structure:** NGS is used to study epigenetic modifications (e.g., DNA methylation) and chromatin accessibility, revealing how gene expression is regulated.
  
  **3.  Structural Biology and Protein Engineering:**
  
  * **Cryo-Electron Microscopy (cryo-EM):** This technique allows for high-resolution imaging of biomolecules, leading to breakthroughs in understanding protein structure and function.
  * **Computational Protein Design:** Researchers are using AI and algorithms to design new proteins with desired properties, potentially leading to novel therapeutics and biomaterials. 
  
  **4.  Systems Biology and Network Analysis:**
  
  * **Systems Biology:** Researchers are using computational models to understand complex biological systems by integrating data from multiple levels (e.g., genes, proteins, metabolism).
  * **Network Analysis:**  Bioinformatics tools are being used to analyze protein-protein interaction networks, gene regulatory networks, and metabolic pathways to uncover system-level insights.
  
  **5.  Bioinformatics in Public Health and Epidemiology:**
  
  * **Disease Surveillance and Outbreak Investigation:** Bioinformatics is used to track and analyze infectious disease outbreaks, helping to control and prevent epidemics.
  * **Population Health Genomics:** Large-scale genomic studies are being used to understand genetic risk factors for diseases and develop strategies for prevention and personalized medicine.
  
  **Where to Find Current Research:**
  
  * **Scientific Journals:**  PubMed (NCBI), Nature, Science, Cell, Genome Biology, Bioinformatics, PLOS Computational Biology. 
  * **Conferences:**  ISMB (Intelligent Systems for Molecular Biology), RECOMB (Research in Computational Molecular Biology), ASHG (American Society of Human Genetics)
  * **Preprint Servers:**  bioRxiv, medRxiv
  
  **Remember:** This is just a snapshot of the many exciting research areas within bioinformatics. The field is constantly evolving, and new discoveries are being made all the time.  
  
  To stay up-to-date, it's essential to follow the latest publications, attend conferences, and engage with the bioinformatics community. "`);

//   console.log(render(parse(response)));

  const onclick = async () => {
    setLoading(true);
    // const chatCompletion = await openai.chat.completions.create({
    //   messages: [{ role: 'user', content: 'Say this is a test' }],
    //   model: 'gpt-3.5-turbo',
    // });
    // console.log(chatCompletion)

    const prompt = "Write a summary (about 300 words) on the given paper specifying paper title, abstract, problem or objectives, solution or findings or purpose, limitaions, future work intended to do : ";

    // const result = await model.generateContent(searchText);
    // console.log(result);
    // const response = await result.response;
    // console.log(response);
    // const text = response.text();

    
    const file = await fetch(searchText)
      .then((res) => res.blob())
      .catch((error) => console.error(error));
    // console.log(file)
    const text = await pdfToText(file)
      .then((text) => {
        return text;
      })
      .catch((error) => console.error("Failed to extract text from pdf"));

      

      // fetch("https://cors-anywhere.herokuapp.com/" + searchText, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/pdf",
    //   },
    // })
    //   .then((response) => response.blob())
    //   .then((blob) => pdfToText(blob))
    //   .then((text) => console.log(text))
    //   .catch((error) => console.error("Failed to extract text from pdf"));

    const result = await model.generateContent(`${prompt}${text}`);
    // console.log(result);
    const response = await result.response;
    // console.log(response);
     
    console.log(response.text())
    setLoading(false);
    // console.log(text);
    setResponse(response.text());
  };

  return (
    <div className="h-[100vh] bg-white flex flex-col justify-center align-middle">
      <div className="min-w-[75%] h-[100vh] bg-gradient-to-r from-green-400 to-blue-500 mx-auto p-[10px]">
        <div className="flex">
          <input
            className="max-h-[80px] w-full text-black/60 text-[25px] px-[10px] outline-none tracking-wider"
            type="text"
            value={searchText}
            onChange={(el) => setSearchText(el.target.value)}
            placeholder="paste the journal link"
          />
          <div
            className="inline bg px-[10px]"
            onClick={() => {
              console.log("clicked");
              onclick();
            }}
          >
            Search
          </div>
        </div>

        {/* {loading ? (
          <SquareLoader color="#fff" size={200} loading={loading} />
        ) : (
          response ? (
            
          )
        )} */}
        {loading ? (
          <div className="mt-[20px] h-[100vh]  text-white text-[12px] flex justify-center align-middle text-pretty">
            <SquareLoader color="#fff" size={200} loading={loading} />
          </div>
        ) : (
          <div
            className="mt-[20px] max-h-[80vh] bg-black/80 text-white text-[12px] overflow-y-scroll text-pretty"
            dangerouslySetInnerHTML={{
              __html: render(parse(response)),
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
