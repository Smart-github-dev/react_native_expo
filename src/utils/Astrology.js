export const getSignFromDate = (dt) => {
  const signs = {
    Aries: [953596800000, 956102400000], //Aries: March 21st - April 19th
    Taurus: [956188800000, 958780800000], //Taurus: April 20th - May 20th
    Gemini: [958867200000, 961459200000], //Gemini: May 21st - June 20th
    Cancer: [961545600000, 964224000000], //Cancer: June 21st - July 22nd
    Leo: [964310400000, 966902400000], //Leo: July 23rd - August 22nd
    Virgo: [966988800000, 969580800000], //Virgo: August 23rd - September 22nd
    Libra: [969667200000, 972172800000], //Libra: September 23rd - October 22nd
    Scorpio: [972259200000, 974764800000], //Scorpio: October 23rd - November 21st
    Sagittarius: [974851200000, 977356800000], //Sagittarius: November 22nd - December 21st
    Capricorn: [977443200000, 979862400000], //Capricorn: December 22nd - January 19th
    Aquarius: [979948800000, 982454400000], //Aquarius: January 20th - February 18th
    Pisces: [982540800000, 985046400000], //Pisces: February 19th - March 20th
  };

  const time = new Date(dt);
  time.setFullYear(2000);
  let sign = "";
  Object.keys(signs).map((s, ind) => {
    if (signs[s][0] <= time.getTime() && signs[s][1] >= time.getTime()) {
      sign = s;
    }
  });

  if (sign === "") {
    time.setFullYear(2001);
    Object.keys(signs).map((s, ind) => {
      if (signs[s][0] <= time.getTime() && signs[s][1] >= time.getTime()) {
        sign = s;
      }
    });
  }

  return sign;
};

export const getMoonSign = (dt) => {
  var date = new Date(dt);
  var GMT_date_o = date.toGMTString();

  var moment_date = GMT_date_o.split(" ");
  console.log(moment_date[2], moment_date[1], moment_date[3]);

  month1 = moment_date[2].toLowerCase();
  var months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  month1 = months.indexOf(month1) + 1;

  var GMT_DATE = moment_date[1] + "/" + month1 + "/" + moment_date[3];
  var curren_Date = "23/01/1921";
  console.log(GMT_DATE);

  var startDate = moment(GMT_DATE, "DD/MM/YYYY");
  var endDate = moment(curren_Date, "DD/MM/YYYY");
  var result = startDate.diff(endDate, "days");
  var calculate_days_total = parseInt(result) + parseInt(1);
  console.log("different days" + calculate_days_total);

  var GMTDATE = moment_date[3] + "," + month1 + "," + moment_date[1];
  //   const date1 = new Date('1/1/1921');
  //   const date2 = new Date(GMTDATE);
  //   const diffTime = Math.abs(date2 - date1);
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   console.log(diffTime + " milliseconds");
  //   console.log(diffDays + " days");
  var GMTDATE_2 = year + "," + month_s + "," + days;
  console.log("------gmtdate2----" + GMTDATE_2);
  const oneDay = 24 * 60 * 60 * 1000;
  // hours*minutes*seconds*milliseconds
  const firstDate = new Date(1921, 1, 23);
  const secondDate = new Date(GMTDATE_2);

  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  console.log("--newformula----" + diffDays);

  var hours = $(".hours_area option:selected").val();
  var PM_AM = $('input[name="radio"]:checked').val();
  if (PM_AM == "PM") {
    var hours_add = parseInt(hours) + parseInt(12);
    var step_3 = parseInt(hours_add) / parseInt(24);
  } else {
    var step_3 = parseInt(hours) / parseInt(24);
  }

  var to_fixed = step_3.toFixed(5);
  console.log(to_fixed, result);
  var totaldays = parseFloat(calculate_days_total) + parseFloat(to_fixed);
  console.log("total_days" + totaldays);

  //   =========================================
  //   13.1762D + 12.0947cos(0.11403D)sin(0.11403(D+1)) - 6.627

  var final =
    13.1762 * totaldays +
    12.0947 *
      Math.cos(0.11403 * totaldays) *
      Math.sin(0.11403 * totaldays + 1 * totaldays) -
    6.627;
  console.log("=====================Formula calculated ====================");
  console.log(final);
  console.log("=====================Formula calculated ====================");
  //   =========================================

  var step_6 = final / 360;

  var fixed_Val = step_6.toFixed(5);
  console.log(fixed_Val);

  var divide_number = fixed_Val.toString().split(".");
  console.log(divide_number[1]);

  var last_4_mystring = divide_number[1].substring(0, 4);

  console.log(last_4_mystring);
  var divideNumber = divide_number[1] / 100000;
  var zodiac_number = divideNumber * 360;

  console.log(zodiac_number);
  if (zodiac_number > 0 && zodiac_number < 29.999) {
    var store = "Leo";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 30 && zodiac_number < 59.999) {
    var store = "Virgo";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 60 && zodiac_number < 89.999) {
    var store = "Libra";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 90 && zodiac_number < 119.999) {
    var store = "Scorpio";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 120 && zodiac_number < 149.999) {
    var store = "Sagittarius";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 150 && zodiac_number < 179.999) {
    var store = "Capricorn";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 180 && zodiac_number < 209.999) {
    var store = "Aquarius";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 210 && zodiac_number < 239.999) {
    var store = "Pisces";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 240 && zodiac_number < 269.999) {
    var store = "Aries";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 270 && zodiac_number < 299.999) {
    var store = "Taurus";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 300 && zodiac_number < 329.999) {
    var store = "Gemini";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  } else if (zodiac_number > 330 && zodiac_number < 359.999) {
    var store = "Cancer";
    $("#s_zodiac").text(store + ".");
    $(".explore_btn #s_zodiac").text(store);

    $(".zodic_details > div").hide();
    $("#" + store).show();
  }

  //   =================================================

  //   var store =MoonCalc.datasForDay(date);
  //   console.log(store.constellation);
  //   $('#s_zodiac').text(store.constellation);
  //    $('.explore_btn #s_zodiac').text(store.constellation);

  //   $('.zodic_details > div').hide();
  //   $('#'+store.constellation).show();
};
