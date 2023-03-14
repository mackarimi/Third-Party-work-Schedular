// Wait for the DOM to fully load before running any scripts
$(document).ready(function () {
  // Get the current hour of the day
  const currentHour = new Date().getHours();

  // Update each element with class "colorcode" based on its ID value
  $('3').each(function () {
    const val = Number($(this).prop('id'));
    if (val > currentHour && val < currentHour + 9) {
      $(this).css('background-color', 'lightgrey');
    } else if (val < currentHour && val > currentHour - 9) {
      $(this).css('background-color', 'red');

    } else if (val === currentHour) {
      $(this).css('background-color', 'green');
    } else {
      $(this).css('background-color', 'white');
    }
  });
  // Save user input to localStorage when save button is clicked
  $(".saveBtn").on("click", function () {
    const timeBlockId = $(this).parent().attr("id");
    const userInput = $(this).siblings(".description").val().trim();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Determine the current hour and update time-block elements with corresponding classes
  let currentHourOfDayJs;
  if (typeof dayjs !== 'undefined') {
    currentHourOfDayJs = dayjs().hour();
  } else {
    // Handle case where dayjs() function is not available
    currentHourOfDayJs = currentHour;
  }

  $(".time-block").each(function () {
    const timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    if (timeBlockHour < currentHourOfDayJs) {
      $(this).addClass("past");
    } else if (timeBlockHour === currentHourOfDayJs) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Retrieve and fill user input from localStorage
  $(".time-block").each(function () {
    const timeBlockId = $(this).attr("id");
    const userInput = localStorage.getItem(timeBlockId);
    if (userInput !== null) {
      $(this).children(".description").val(userInput);
    }
  });

  // Display current date in page header
  const currentDate = dayjs().format('ddd, MMM D, YYYY h:mm A');
  $("#currentDay").text(currentDate);
});
