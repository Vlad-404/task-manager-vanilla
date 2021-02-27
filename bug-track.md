BID: #001

**Description:** when pressing escape key while editing title, user got alerted that new title cannot be empty
- **consequence:** user wasn't able to change the title
- **resolution:** added _`if (titleInput.value == '')`_ loop within enter event
---
BID: #002

**Description:** After editing task all edit buttons stay disabled
- **consequence:** User cannot edit any other tasks
- **resolution:** Added `editTask` function to `showTasks` so it can be re-initialised each time list is generated