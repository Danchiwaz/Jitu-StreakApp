import {
    BtnSubmit,
    displayForm,
    displayHero,
    StreakMainClass,
    taskImage,
    taskName,
    taskStartDate,
    toggleBtn,
} from "./Main.js";

const error_message = document.getElementById("error_message")!;

// end of modal functionality logic

class StreakActions extends StreakMainClass {
    constructor() {
        super();
    }

    static resetForm(): void {
        taskName.value = "";
        taskImage.value = "";
        taskStartDate.value = "";
    }
}

const toggle = new StreakActions();

toggleBtn.addEventListener("click", () => toggle.toggleDisplays(displayHero, displayForm));
displayHero.style.display = "block";
displayForm.style.display = "none";

let task;

BtnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (taskName.value !== "" && taskImage.value !== "" && taskStartDate.value !== "" && taskStartDate.value !== "") {
        task = {
            id: Math.ceil(Math.random() * 100),
            taskName: taskName.value,
            imageUrl: taskImage.value,
            startDate: taskStartDate.value,
        };
        toggle.captureData(task);
        toggle.renderStreaksToDom();
        toggle.bestStreak();

        StreakActions.resetForm();
        displayHero.style.display = "block";
        displayForm.style.display = "none";
    } else {
        error_message.innerText = "Please Fill all Fields";
    }
});
