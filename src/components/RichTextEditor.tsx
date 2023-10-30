import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export const RichTextEditor = ({
    value, 
    HandleChange,
    HandleBlur,
    addValue,
    isShort
}:{
    value:string,
    HandleChange: (e: any)=> void, 
    HandleBlur:(e: React.FocusEvent<HTMLTextAreaElement>) => void
    addValue:(e:any)=>void,
    isShort: boolean
})=>{

    const [preview, setPreview] = useState(false);

    return(
        <div className="w-full h-full">
            <label htmlFor="blog" className="w-full">
                {!isShort ?<span className="label-text text-red-600 mt-20">can not publish without or less than 500 words of Blog Content!!</span>:null}
                <span className="w-full flex justify-center py-4 sticky top-16 bg-base-100 border border-gray-700">
                    <ul className="flex items-center gap-x-4 sticky">
                        <li>
                            <button
                                value={'**BOLD**'}
                                className="border border-transparent active:border-gray-500 p-2"
                                onClick={addValue}
                                >
                                    <svg className="w-4 h-4 text-gray-800 dark:text-white pointer-events-none " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 1h4.5a3.5 3.5 0 1 1 0 7H3m0-7v7m0-7H1m2 7h6.5a3.5 3.5 0 1 1 0 7H3m0-7v7m0 0H1"/>
                                    </svg>
                            </button>
                        </li>
                        <li>
                            <button
                                className="border border-transparent active:border-gray-500 p-2"
                                value={'_ITALIC_'}
                                onClick={addValue}
                                ><svg className="w-4 h-4 text-gray-800 dark:text-white pointer-events-none " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m3.874 15 6.143-14M1 15h6.33M6.67 1H13"/>
                            </svg>
                            </button>
                        </li>
                        <li>
                            <select className="select select-sm w-fit text-base"
                                onChange={addValue}>
                                <option
                                    className="text-base"
                                    value={'# HEADING 1'}>
                                    Heading 1
                                </option>
                                <option
                                    className="text-base"
                                    value={'## HEADING 2'}>
                                    Heading 2
                                </option>
                                <option
                                    className="text-base"
                                    value={'### HEADING 3'}>
                                    Heading 3
                                </option>
                            </select>
                        </li>
                        <li>
                            <button
                                className="border border-transparent active:border-gray-500 p-2"
                                value={'-'}
                                onClick={addValue}
                                >
                                    <svg className="w-4 h-4 text-gray-800 dark:text-white pointer-events-none " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"/>
                                    </svg>
                            </button>
                        </li>
                        <li>
                            <button
                                className="border border-transparent active:border-gray-500 p-2"
                                value={'1.'}
                                onClick={addValue}
                                >
                                    <svg className="w-4 h-4 text-gray-800 dark:text-white pointer-events-none " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 18">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"/>
                                    </svg>
                            </button>
                        </li>
                        <li>
                            <button
                                className="border border-transparent active:border-gray-500 p-2"
                                value={'`  `'}
                                onClick={addValue}
                                ><svg className="w-4 h-4 text-gray-800 dark:text-white pointer-events-none " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"/>
                            </svg>
                            </button>
                        </li>
                        <li>
                            <button
                                className="border border-transparent active:border-gray-500 p-2"
                                value={'```  ```'}
                                onClick={addValue}
                                ><svg className="w-4 h-4 text-gray-800 dark:text-white pointer-events-none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 1v4a1 1 0 0 1-1 1H1m5 8.514L4 12.5l2-2m4 4.014 2-2.014-2-2m5 7.5a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v16Z"/>
                            </svg>
                            </button>
                        </li>
                        <li>
                            <button
                                className="border border-transparent active:border-gray-500 p-2"
                                value={'[title](example.com)'}
                                onClick={addValue}
                                ><svg className="w-4 h-4 text-gray-800 dark:text-white pointer-events-none " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.013 7.962a3.519 3.519 0 0 0-4.975 0l-3.554 3.554a3.518 3.518 0 0 0 4.975 4.975l.461-.46m-.461-4.515a3.518 3.518 0 0 0 4.975 0l3.553-3.554a3.518 3.518 0 0 0-4.974-4.975L10.3 3.7"/>
                            </svg>
                            </button>
                        </li>
                        <li>
                            <button
                                className="border border-transparent active:border-gray-500 p-2"
                                value={'![title](example.com)'}
                                onClick={addValue}
                                ><svg className="w-4 h-4 text-gray-800 dark:text-white pointer-events-none " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                                <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
                            </svg>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={(e)=>{
                                    e.preventDefault()
                                    setPreview(!preview)
                                }}
                            >
                                {preview?
                                    <svg className="w-4 h-4 pointer-events-none text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z"/>
                                    <path d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"/>
                                    <path d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"/>
                                    </svg>:
                                    <svg className="w-4 h-4 pointer-events-none text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                    <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                                    </svg>    
                            }
                            </button>
                        </li>

                    </ul>
                </span>
                {preview?
                    <div>
                        <ReactMarkdown className="textarea textarea-bordered textarea-lg w-full h-full mt-4">
                            {value}
                        </ReactMarkdown>
                    </div>
                :
                    <textarea
                        id="blog"
                        name="blog"
                        value={value}
                        rows={10}
                        required
                        className="textarea textarea-bordered textarea-lg w-full h-full mt-4"
                        onBlur={HandleBlur}
                        onChange={HandleChange}
                        >
                    </textarea>
                }
            </label>
        </div>
    )
}