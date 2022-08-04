import { renderModal, renderStreaks } from "../Helper/Render.js";
import { StreakInterface } from "../interfaces/StreakInterface.js";
import { CalculateDays } from "./DaysCalculations.js";

export const form = document.getElementById("form") as HTMLFormElement;
export const taskName = document.getElementById("taskName") as HTMLInputElement;
export const taskImage = document.getElementById("taskImage") as HTMLInputElement;
export const taskStartDate = document.getElementById("taskStartDate") as HTMLInputElement;
export const BtnSubmit = document.getElementById("BtnSubmit") as HTMLButtonElement;
export const toggleBtn = document.getElementById("toggleBtn") as HTMLButtonElement;
export const displayForm = document.getElementById("displayForm") as HTMLDivElement;
export const displayHero = document.getElementById("displayHero") as HTMLDivElement;
const streakItems = document.getElementById("streakItems") as HTMLDivElement;
const definition_text = document.getElementById("definition_text") as HTMLDivElement;
const modalWindow = document.getElementById("modalWindow")!;

export class StreakMainClass {
    private streak: StreakInterface[] = [];

    public getStrek() {
        return this.streak;
    }

    public toggleDisplays(display1: HTMLDivElement, display2: HTMLDivElement):void {
        if (display1.style.display == "block" && display2.style.display == "none") {
            display1.style.display = "none";
            display2.style.display = "block";
        } else {
            display1.style.display = "block";
            display2.style.display = "none";
        }
    }

    public captureData(task: StreakInterface) {
        this.streak.push(task);
        // console.log(this.streak);
    }

    public renderStreaksToDom(): void {
        if (renderStreaks(this.streak)) {
            definition_text.innerHTML = "<p class='status_desc'>Activities</p>";
            streakItems.innerHTML = renderStreaks(this.streak);

            for (let i = 0; i < streakItems.children.length; i++) {
                streakItems.children[i].addEventListener("click", (e) => {
                    renderModal(i);
                    const DeleteBtn = document.getElementById("DeleteBtn")!;
                    DeleteBtn.addEventListener("click", () => {
                        console.log(i, this.streak[i]);
                        this.streak.splice(i, 1);
                        this.renderStreaksToDom();
                        modalWindow.style.display = "none";
                    });
                });
            }
        } else {
            definition_text.innerHTML = "<p class='status_desc1'>You Don't Have Any Activity!!!</p>";
            streakItems.innerHTML = renderStreaks(this.streak);
        }
    }

    public bestStreak(): void {
        for (var i = 0; i < this.streak.length; i++) {
            var Beststreak = Math.max(this.streak[i].id);
        }
        let streakItem = this.streak.find((streak) => streak.id === Beststreak);
        document.getElementById("bestStreak")!.innerHTML = "";
        if (streakItem) {
            document.getElementById("bestStreak")!.innerHTML = `
        <h4 class="best_description">Best Streak</h4>
       <div class="streak__item" id="${streakItem.id}">
                <img
                  id="img_modal"
                  class="streak__img"
                  src="${streakItem.imageUrl}"
                  alt=""
                />
                <div class="streak__description">
                  <div class="icon_desc">
                    <ion-icon class="iconic" name="calendar-outline"></ion-icon>
                    <h5>${streakItem.startDate}</h5>
                  </div>

                  <p class="streak_name">${streakItem.taskName}</p>
                </div>
              </div>`;
        }
    }
}
