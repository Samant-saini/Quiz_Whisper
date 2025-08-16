    





// //ye vala kaam kar hai lekin silf question ke liye
// document.getElementById('getTextBtn').addEventListener('click', async () => {
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     const results = await chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: () => {
//             let output = "";

//             // Get all questions
//             const questionElems = document.querySelectorAll('span.M7eMe');

//             questionElems.forEach((qElem, index) => {
//                 const questionText = qElem.innerText.trim();
//                 output += `Q${index + 1}: ${questionText}\n`;

//                 // Now find the options related to this question
//                 // Move up to the question's parent block
//                 const questionBlock = qElem.closest('.M4DNQ')?.parentElement;

//                 if (questionBlock) {
//                     // Grab option spans inside the same question container
//                     const options = questionBlock.querySelectorAll(
//                         'span.aDTYNe.snByac.OvPDhc.OIC90c, span.aDTYNe.snByac.OvPDhc'
//                     );

//                     options.forEach((optElem, optIndex) => {
//                         const optText = optElem.innerText.trim();
//                         if (optText) {
//                             output += `  ${String.fromCharCode(97 + optIndex)}) ${optText}\n`;
//                         }
//                     });
//                 }

//                 output += "\n";
//             });

//             return output || "No questions found.";
//         }
//     });

//     document.getElementById('pageText').value = results[0]?.result || "Error fetching text.";
// });






//ye kaam kara hai dono question aur opiton ke liye 
// document.getElementById('getTextBtn').addEventListener('click', async () => {
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     const results = await chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: () => {
//             let output = "";

//             // Select all question spans
//             const questionElems = document.querySelectorAll('span.M7eMe');

//             questionElems.forEach((qElem, index) => {
//                 const questionText = qElem.innerText.trim();
//                 output += `Q${index + 1}: ${questionText}\n`;

//                 // Find the container that holds both question and options
//                 const questionContainer = qElem.closest('div[role="listitem"]') || qElem.closest('.Qr7Oae');

//                 if (questionContainer) {
//                     // Find all option spans inside the same container
//                     const options = questionContainer.querySelectorAll(
//                         'span.aDTYNe.snByac.OvPDhc, span.aDTYNe.snByac.OvPDhc.OIC90c'
//                     );

//                     options.forEach((optElem, optIndex) => {
//                         const optText = optElem.innerText.trim();
//                         if (optText) {
//                             output += `  ${String.fromCharCode(97 + optIndex)}) ${optText}\n`;
//                         }
//                     });
//                 }

//                 output += "\n";
//             });

//             return output || "No questions found.";
//         }
//     });

//     document.getElementById('pageText').value = results[0]?.result || "Error fetching text.";
// });




// ye vala acche se kaam kara hai 
// document.getElementById('getTextBtn').addEventListener('click', async () => {
//     const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     // Step 1: Scrape questions from Google Form
//     const results = await chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: () => {
//             let output = "";
//             const questionElems = document.querySelectorAll('span.M7eMe');

//             questionElems.forEach((qElem, index) => {
//                 const questionText = qElem.innerText.trim();
//                 if (!questionText) return;

//                 output += `Q${index + 1}: ${questionText}\n`;

//                 const questionContainer = qElem.closest('div[role="listitem"]') || qElem.closest('.Qr7Oae');
//                 if (questionContainer) {
//                     const options = questionContainer.querySelectorAll(
//                         'span.aDTYNe.snByac.OvPDhc, span.aDTYNe.snByac.OvPDhc.OIC90c'
//                     );
//                     options.forEach((optElem, optIndex) => {
//                         const optText = optElem.innerText.trim();
//                         if (optText) {
//                             output += `  ${String.fromCharCode(97 + optIndex)}) ${optText}\n`;
//                         }
//                     });
//                 }

//                 output += "\n";
//             });

//             return output || "No questions found.";
//         }
//     });

//     const questionsText = results[0]?.result || "Error fetching text.";
//     document.getElementById('questions').value = questionsText;

//     // Step 2: Send questions to backend for AI answers
//     try {
//         const res = await fetch('http://localhost:8080/api/research/process', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 operation: 'answer', // This tells backend to answer questions
//                 content: questionsText
//             })
//         });

//         const answerText = await res.text();
//         document.getElementById('answers').value = answerText;

//     } catch (err) {
//         console.error("Error sending to backend:", err);
//         document.getElementById('answers').value = "Error getting answers from backend.";
//     }
// });



document.getElementById('getTextBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            let output = "";
            const host = window.location.hostname;

            if (host.includes("docs.google.com")) {
                // --- GOOGLE FORMS ---
                const questionElems = document.querySelectorAll('span.M7eMe');
                questionElems.forEach((qElem, index) => {
                    const questionText = qElem.innerText.trim();
                    if (!questionText) return;

                    output += `Q${index + 1}: ${questionText}\n`;

                    const questionContainer = qElem.closest('div[role="listitem"]') || qElem.closest('.Qr7Oae');
                    if (questionContainer) {
                        const options = questionContainer.querySelectorAll(
                            'span.aDTYNe.snByac.OvPDhc, span.aDTYNe.snByac.OvPDhc.OIC90c'
                        );
                        options.forEach((optElem, optIndex) => {
                            const optText = optElem.innerText.trim();
                            if (optText) {
                                output += `  ${String.fromCharCode(97 + optIndex)}) ${optText}\n`;
                            }
                        });
                    }

                    output += "\n";
                });
            } 
            else if (host.includes("nptel.ac.in")) {
                // --- NPTEL QUIZ ---
                const questionElems = document.querySelectorAll('div.qt-question');
                questionElems.forEach((qElem, index) => {
                    const questionText = qElem.innerText.trim();
                    if (!questionText) return;

                    output += `Q${index + 1}: ${questionText}\n`;

                    const choiceElems = qElem.parentElement.querySelectorAll('.qt-choices .gcb-mcq-choice label');
                    choiceElems.forEach((optElem, optIndex) => {
                        const optText = optElem.innerText.trim();
                        if (optText) {
                            output += `  ${String.fromCharCode(97 + optIndex)}) ${optText}\n`;
                        }
                    });

                    output += "\n";
                });
            }
            else {
                output = "This site is not supported yet.";
            }

            return output || "No questions found.";
        }
    });

    const questionsText = results[0]?.result || "Error fetching text.";
    document.getElementById('questions').value = questionsText;

    // Send to backend for answers
    try {
        const res = await fetch('http://localhost:8080/api/research/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                operation: 'answer',
                content: questionsText
            })
        });

        const answerText = await res.text();
        document.getElementById('answers').value = answerText;

    } catch (err) {
        console.error("Error sending to backend:", err);
        document.getElementById('answers').value = "Error getting answers from backend.";
    }
});

