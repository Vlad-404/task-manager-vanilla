BID: #001
**Description**: when pressing escape key while editing title, user got alerted that new title cannot be empty
    - **consequence**: user wasn't able to change the title
    - **resolution:** added `if (titleInput.value == '')` loop within enter event