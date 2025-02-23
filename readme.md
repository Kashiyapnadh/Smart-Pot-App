# outline of readme md

project description and logo
technologies used
table of contents

## Section 1 setting up the LLM-Model.

option one download pretrained model.
option two train it yourself

 python 3.11 is tested + discsalimer for untested versions
    
    
    create virtual env name chatbotenv
    navigate to chat-bot-server folder
    install requiremrnts .txt
    then 

option 1:


    run train_llm.py

option 2:

    download the pre trained model by running the script download.py

now the model is downloaded and and ready to use

    start the fast api server that accepts the queries from and forwards to it the llm model which then returns the output.
  // word it better later
  using this command
  uvicorn main:app --host 0.0.0.0 --reload

    now llm model is running in local host.


## Section 2 Mobile Application 
    