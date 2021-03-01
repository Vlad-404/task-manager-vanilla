BID: #001

**Description:** when pressing escape key while editing title, user got alerted that new title cannot be empty
- **consequence:** user wasn't able to change the title
- **resolution:** added _`if (titleInput.value == '')`_ loop within enter event
---
BID: #002

**Description:** After editing task all edit buttons stay disabled
- **consequence:** User cannot edit any other tasks
- **resolution:** Added `editTask` function to `showTasks` so it can be re-initialised each time list is generated
---
BID: #003

**Description:** After storing task in local storage, instead of adding tasks, new task overwrote the previous one
- **consequence:** User couldn't have more than one task
- **resolution:** Fixed if condition in `showTasks` function from `(localStorage.getItem('myTasks'))` to `(localStorage.getItem('myTasks') == null)`
---

BID: #004
**Description:** 
- **consequence:** 
- **resolution:**
