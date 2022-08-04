import { StreakInterface } from "../interfaces/StreakInterface.js";
import { CalculateDays } from "../classes/DaysCalculations.js";

const modalWindow = document.getElementById("modalWindow")!;


let _streaks: StreakInterface[];

const currentDate = new Date().getDate();

export const renderStreaks = (streaks: StreakInterface[]): string => {
    _streaks = streaks;
    
    return streaks
        .map(
            (streak) => `
              <div class="streak__item" id="${streak.id}">
                <img
                  id="img_modal"
                  class="streak__img"
                  src="${streak.imageUrl}"
                  alt=""
                />
                <div class="streak__description">
                  <div class="icon_desc">
                    <ion-icon class="iconic" name="calendar-outline"></ion-icon>
                    <h5>${streak.startDate}</h5>
                  </div>

                  <p class="streak_name">${streak.taskName}</p>
                </div>
              </div>
            `
        )
        .join("");
};

export const renderModal = (streakId: number) => {
    const streak = _streaks.find((streak, index) => index === streakId);
    // console.log(streak);
    if (!streak) return "";
    modalWindow.innerHTML = "";
    modalWindow.innerHTML += `
    <div id="streak__item-modal">
      <img class="streak__img-modal" src="${streak.imageUrl}" alt="" />
      <div class="streak__description">
        <div class="icon_desc">
          <ion-icon class="iconic" name="calendar-outline"></ion-icon>
          <h5>${streak.startDate}</h5>
        </div>

        <p class="streak_name">${streak.taskName}</p>
        <p>
          ${new CalculateDays(streak.startDate).getTimeDifference()} days
        </p>
      </div>
      <div class="streak__footer">
        <button
          id="closeBtn"
          onclick="modalWindow.style.display = 'none';">Close</button>
        <button id="DeleteBtn">Delete</button>
      </div>
    </div>
  `;
    modalWindow.style.display = "block";
};



