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
  const [response, setResponse] = useState([]);

  //   console.log(render(parse(response)));

  const onclick = async () => {
    setLoading(true);
    let dataList = [];
    console.log("clicked........." + searchText);
    fetch(`http://127.0.0.1:8000/api/search/${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        dataList = data.data;
        dataList.sort(
          (a, b) => parseInt(b.numCitations) - parseInt(a.numCitations)
        );
        console.log(data.data);
        console.log(dataList);
        setLoading(false);
        setResponse(dataList);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setResponse([]);
      });
    // {
    //   title: 'Encyclopedia of machine learning',
    //   url: 'https://books.google.com/books?hl=en&lr=&id=i8hQhp1a62UC&oi=fnd&pg=PT29&dq=machine+learning&ots=92jeCvdydN&sig=iP7jp9FeqwdqPpOhot2Nkrqf4AA',
    //   authors: [ 'C Sammut', 'C Sammut GI Webb' ],
    //   year: 2011,
    //   numCitations: 2210,
    //   description: '… Machine Learning came to be identified as a research field in … machine learning appeared. \n' +
    //     'Although the field coalesced in the s, research on what we now call machine learning …',
    //   pdf: undefined,
    //   citationUrl: 'http://scholar.google.com/scholar?cites=16791323098365028130&as_sdt=2005&sciodt=0,5&hl=en&oe=ASCII',
    //   relatedUrl: 'http://scholar.google.com/scholar?q=related:IufbymTDBukJ:scholar.google.com/&scioq=machine+learning&hl=en&oe=ASCII&as_sdt=0,5',
    //   urlVersionsList: 'http://scholar.google.com/scholar?cluster=16791323098365028130&hl=en&oe=ASCII&as_sdt=0,5',
    //   publication: 'books.google.com'
    // }
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
            placeholder="search topic"
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
          <div className="mt-[20px] max-h-[80vh] bg-black/80 text-white text-[12px] overflow-y-scroll text-pretty">
            {response.map((item) => (
              <div key={item.title}>
                <p>Title : {item.title}</p>
                <div>
                  <p className="inline">Authors List : </p>
                  {item.authors.map((name) => (
                    <span key={name}>{name}, </span>
                  ))}
                </div>
                <p>Total citations : {item.numCitations}</p>
                <p>Paper Link : {item.url}</p>
                <p>
                  ==================================================================================
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
