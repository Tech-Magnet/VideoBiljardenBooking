// Function to import specified columns from the table into separate arrays
function importColumnsToArrays(tableId, columnIndices) {
  const table = document.getElementById(tableId);
  const rows = table.getElementsByTagName('tr');
  const columnArrays = [];
  // Initialize separate arrays for each specified column
  for (let i = 0; i < columnIndices.length; i++) {
    columnArrays.push([]);
  }
  // Iterate through the rows and extract values for each specified column
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName('td');
    for (let j = 0; j < columnIndices.length; j++) {
      const columnIndex = columnIndices[j];
      if (cells.length > columnIndex) {
        columnArrays[j].push(cells[columnIndex].innerText);
      }
    }
  }
  return columnArrays;
}
function GetArrays(index){
  // Usage example: Importing columns 0, 1, and 2 into separate arrays
  const tableId = 'dbTable';
  const columnIndices = [0, 1, 2, 3];
  const [arrayColumn0, arrayColumn1, arrayColumn2, arrayColumn3] = importColumnsToArrays(tableId, columnIndices);

  console.log("ARRAY WEEK_INDEX: " + arrayColumn0);
  console.log("ARRAY TIME: " + arrayColumn1);
  console.log("ARRAY TABL: " + arrayColumn2);
  console.log("ARRAY DATE: " + arrayColumn3);

  if(index == 0){
    return arrayColumn0;
  }else if (index == 1){
    return arrayColumn1
  }else if (index == 2){
    return arrayColumn2;
  }
}

function CheckForTimeChange(){
  if(document.getElementById('txtDate') == 5 || document.getElementById('txtDate') == 6){
    document.getElementById('txtTime_13').disabled = false;
    document.getElementById('txtTime_14').disabled = false;
    document.getElementById('txtTime_24').disabled = false;
  }else{
    document.getElementById('txtTime_13').disabled = true;
    document.getElementById('txtTime_14').disabled = true;
    document.getElementById('txtTime_24').disabled = true;
  }
}


function CheckForExistDB(date, time, table){
  const arrayColumn0 = GetArrays(0);
  const arrayColumn1 = GetArrays(1);
  const arrayColumn2 = GetArrays(2);

  let found = false

  for(i = 0; i < arrayColumn0.length; i++){
    if (arrayColumn0[i] == date && arrayColumn1[i] == time && arrayColumn2[i] == table){
      console.log("SAME DATA AS ON FILE");
      found = true;
      return true;
    }
  }
  if (!found){
    //console.log("NOT THE SAME AS ON FILE");
    //console.log("ENTRY: " + date + ", " + time + ", " + table);
    return false;
  }
}

// Function to handle form submission
function CheckSubmit() {
  //importing values from form on index.php
  var name = document.getElementById('txtName').value;
  var phone = document.getElementById('txtPhone').value;
  var date = document.getElementById('txtDate').value;
  var time = document.getElementById('txtTime').value;
  var table = document.getElementById('txtTable').value;
  var length = document.getElementById('txtLength').value;
  var bk_date = document.getElementById('bkDate').value;

  if(length <= 0){
    document.getElementById('txtLength').value = 1;
  }

  const current_date_db = new Date();//2023-07-31
  let mm = current_date_db.getMonth() + 1;
  let yyyy = current_date_db.getFullYear();
  //console.log("MONTH: " + mm);
  //console.log("CURRENT WEEKDAY: " + day);


  if(date == 0){//Sunday
    var BOOK_SUN = current_date_db.getDate();

    //Sunday
    document.getElementById('bkDate').value = yyyy + "-" + BOOK_SUN + "-" + mm;
  }else if(date == 1){//Monday
    var BOOK_MON = current_date_db.getDate();

    //Monday
    document.getElementById('bkDate').value = yyyy + "-" + BOOK_MON + "-" + mm;
  }else if(date == 2){//Tuesday
    var BOOK_TUE = current_date_db.getDate();

    //Tuesday
    document.getElementById('bkDate').value = yyyy + "-" + BOOK_TUE + "-" + mm;
  }else if(date == 3){//Wednesday
    var BOOK_WED = current_date_db.getDate();

    //Wednesday
    document.getElementById('bkDate').value = yyyy + "-" + BOOK_WED + "-" + mm;
  }else if(date == 4){//Thursday
    var BOOK_THU = current_date_db.getDate();

    //Thursday
    document.getElementById('bkDate').value = yyyy + "-" + BOOK_THU + "-" + mm;
  }else if(date == 5){//Friday
    var BOOK_FRI = current_date_db.getDate();

    //Friday
    document.getElementById('bkDate').value = yyyy + "-" + BOOK_FRI + "-" + mm;
  }else if(date == 6){//Saturday
    var BOOK_SAT = current_date_db.getDate();

    //Friday
    document.getElementById('bkDate').value = yyyy + "-" + BOOK_FRI + "-" + mm;
  }

  //console.log("NAME: " + name);
  //console.log("PHONE: " + phone);
  //console.log("DATE: " + date);
  //console.log("TIME: " + time);
  //console.log("TABLE: " + table);
  //console.log("LENGTH: " + length);
  //console.log("");
  //console.log("");
  //console.log("");

  if(CheckForExistDB(date, time, table)){
    alert("Ledsen men Tiden du har valt är inte tillgänging, var god och välj en annan tid");
  }else if(!CheckForExistDB(date, time, table)){
    console.log("Submit");
    const form = document.getElementById('myForm');
    form.submit();
    console.log("Submit");
  }
}





















function Start(){
  
  const arrayColumn0 = GetArrays(0);
  const arrayColumn1 = GetArrays(1);
  const arrayColumn2 = GetArrays(2);

  for (i = 0; i < arrayColumn2.length; i++){
    if(arrayColumn2[i] == "Bord_1"){
      if(arrayColumn0[i] == 0){//SUNDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_sun";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 1){//MONDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_mon";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 2){//TUESDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_tue";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 3){//WEDNESDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_wed";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 4){//THURSDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_thu";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 5){//FRIDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_fri";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 6){//SATURDAY
        var ID_BUILD = "TT_NEW_" + arrayColumn1[i] + "_sat";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }
    }else if(arrayColumn2[i] == "Bord_2"){
      if(arrayColumn0[i] == 0){//SUNDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_sun";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 1){//MONDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_mon";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 2){//TUESDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_tue";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 3){//WEDNESDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_wed";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 4){//THURSDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_thu";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 5){//FRIDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_fri";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }else if(arrayColumn0[i] == 6){//SATURDAY
        var ID_BUILD = "TT_OLD_" + arrayColumn1[i] + "_sat";
        document.getElementById(ID_BUILD).style.backgroundColor = "#a1181f";
      }
    }
  }
}



  //const current_date = new Date();
  //let day = current_date.getDay();

  /*if(day == 0){//Sunday
    var CUR_MON = current_date.getDate() - 6;
    var CUR_TUE = current_date.getDate() - 5;
    var CUR_WED = current_date.getDate() - 4;
    var CUR_THU = current_date.getDate() - 3;
    var CUR_FRI = current_date.getDate() - 2;
    var CUR_SAT = current_date.getDate() - 1;
    var CUR_SUN = current_date.getDate();


    /*const M_SEC_MON_C = 6 * 24 * 60 * 60 * 1000;
    const CUR_MON = new Date(date.getTime() - M_SEC_MON_C);


    const M_SEC_TUE_C = 5 * 24 * 60 * 60 * 1000;
    const CUR_TUE = new Date(date.getTime() - M_SEC_TUE_C);


    const M_SEC_WED_C = 4 * 24 * 60 * 60 * 1000;
    const CUR_WED = new Date(date.getTime() - M_SEC_WED_C);


    const M_SEC_THU_C = 3 * 24 * 60 * 60 * 1000;
    const CUR_THU = new Date(date.getTime() - M_SEC_THU_C);


    const M_SEC_FRI_C = 2 * 24 * 60 * 60 * 1000;
    const CUR_FRI = new Date(date.getTime() - M_SEC_FRI_C); 


    const M_SEC_SAT_C = 1 * 24 * 60 * 60 * 1000;
    const CUR_SAT = new Date(date.getTime() - M_SEC_SAT_C);


    const M_SEC_SUN_C = 0 * 24 * 60 * 60 * 1000;
    const CUR_SUN = new Date(date.getTime());*/


    

    //var NEX_MON = current_date.getDate() + 1;
    //var NEX_TUE = current_date.getDate() + 2;
    //var NEX_WED = current_date.getDate() + 3;
    //var NEX_THU = current_date.getDate() + 4;
    //var NEX_FRI = current_date.getDate() + 5;
    //var NEX_SAT = current_date.getDate() + 6;
    //var NEX_SUN = current_date.getDate() + 7;

    /*const M_SEC_MON_N = 1 * 24 * 60 * 60 * 1000;
    const NEX_MON = new Date(date.getTime() + M_SEC_MON_N);


    const M_SEC_TUE_N = 2 * 24 * 60 * 60 * 1000;
    const NEX_TUE = new Date(date.getTime() + M_SEC_TUE_N);


    const M_SEC_WED_N = 3 * 24 * 60 * 60 * 1000;
    const NEX_WED = new Date(date.getTime() + M_SEC_WED_N);


    const M_SEC_THU_N = 4 * 24 * 60 * 60 * 1000;
    const NEX_THU = new Date(date.getTime() + M_SEC_THU_N);


    const M_SEC_FRI_N = 5 * 24 * 60 * 60 * 1000;
    const NEX_FRI = new Date(date.getTime() + M_SEC_FRI_N);


    const M_SEC_SAT_N = 6 * 24 * 60 * 60 * 1000;
    const NEX_SAT = new Date(date.getTime() + M_SEC_SAT_N);


    const M_SEC_SUN_N = 7 * 24 * 60 * 60 * 1000;
    const NEX_SUN = new Date(date.getTime()) + M_SEC_SUN_N;*/

    /*//Monday
    document.getElementById('TTN_NEW_mon').innerText = CUR_MON + "-" + mm;
    document.getElementById('TTN_OLD_mon').innerText = CUR_MON + "-" + mm;
    //Tuesday
    document.getElementById('TTN_NEW_tue').innerText = CUR_TUE + "-" + mm;
    document.getElementById('TTN_OLD_tue').innerText = CUR_TUE + "-" + mm;
    //Wednesday
    document.getElementById('TTN_NEW_wed').innerText = CUR_WED + "-" + mm;
    document.getElementById('TTN_OLD_wed').innerText = CUR_WED + "-" + mm;
    //Thursday
    document.getElementById('TTN_NEW_thu').innerText = CUR_THU + "-" + mm;
    document.getElementById('TTN_OLD_thu').innerText = CUR_THU + "-" + mm;
    //Friday
    document.getElementById('TTN_NEW_fri').innerText = CUR_FRI + "-" + mm;
    document.getElementById('TTN_OLD_fri').innerText = CUR_FRI + "-" + mm;
    //Saturday
    document.getElementById('TTN_NEW_sat').innerText = CUR_SAT + "-" + mm;
    document.getElementById('TTN_OLD_sat').innerText = CUR_SAT + "-" + mm;
    //Sunday
    document.getElementById('TTN_NEW_sun').innerText = CUR_SUN + "-" + mm;
    document.getElementById('TTN_OLD_sun').innerText = CUR_SUN + "-" + mm;
    //DROPDOWN 1
    //Monday
    document.getElementById('DATE-CURR-MON').innerText = "Måndag  " + CUR_MON + "-" + mm;
    //Tuesday
    document.getElementById('DATE-CURR-TUE').innerText = "Tisdag  " + CUR_TUE + "-" + mm;
    //Wednesday
    document.getElementById('DATE-CURR-WED').innerText = "Onsdag  " + CUR_WED + "-" + mm;
    //Thursday
    document.getElementById('DATE-CURR-THU').innerText = "Torsdag  " + CUR_THU + "-" + mm;
    //Friday
    document.getElementById('DATE-CURR-FRI').innerText = "Fredag  " + CUR_FRI + "-" + mm;
    //Saturday
    document.getElementById('DATE-CURR-SAT').innerText = "Lördag  " + CUR_SAT + "-" + mm;
    //Sunday
    document.getElementById('DATE-CURR-SUN').innerText = "Söndag  " + CUR_SUN + "-" + mm;

    //DROPDOWN 2
    //Monday
    document.getElementById('DATE-NEXT-MON').innerText = "Måndag  " + NEX_MON + "-" + mm;
    //Tuesday
    document.getElementById('DATE-NEXT-TUE').innerText = "Tisdag  " + NEX_TUE + "-" + mm;
    //Wednesday
    document.getElementById('DATE-NEXT-WED').innerText = "Onsdag  " + NEX_WED + "-" + mm;
    //Thursday
    document.getElementById('DATE-NEXT-THU').innerText = "Torsdag  " + NEX_THU + "-" + mm;
    //Friday
    document.getElementById('DATE-NEXT-FRI').innerText = "Fredag  " + NEX_FRI + "-" + mm;
    //Saturday
    document.getElementById('DATE-NEXT-SAT').innerText = "Lördag  " + NEX_SAT + "-" + mm;
    //Sunday
    document.getElementById('DATE-NEXT-SUN').innerText = "Söndag  " + NEX_SUN + "-" + mm;*/
  /*}else if(day == 1){//Monday
    var CUR_MON = current_date.getDate();
    var CUR_TUE = current_date.getDate() + 1;
    var CUR_WED = current_date.getDate() + 2;
    var CUR_THU = current_date.getDate() + 3;
    var CUR_FRI = current_date.getDate() + 4;
    var CUR_SAT = current_date.getDate() + 5;
    var CUR_SUN = current_date.getDate() + 6;


    /*const CUR_MON = new Date(date.getTime());


    const M_SEC_TUE_C = 1 * 24 * 60 * 60 * 1000;
    const CUR_TUE = new Date(date.getTime() + M_SEC_TUE_C);


    const M_SEC_WED_C = 2 * 24 * 60 * 60 * 1000;
    const CUR_WED = new Date(date.getTime() + M_SEC_WED_C);


    const M_SEC_THU_C = 3 * 24 * 60 * 60 * 1000;
    const CUR_THU = new Date(date.getTime() + M_SEC_THU_C);


    const M_SEC_FRI_C = 4 * 24 * 60 * 60 * 1000;
    const CUR_FRI = new Date(date.getTime() + M_SEC_FRI_C); 


    const M_SEC_SAT_C = 5 * 24 * 60 * 60 * 1000;
    const CUR_SAT = new Date(date.getTime() + M_SEC_SAT_C);


    const M_SEC_SUN_C = 6 * 24 * 60 * 60 * 1000;
    const CUR_SUN = new Date(date.getTime());*/



    //var NEX_MON = current_date.getDate() + 7;
    //var NEX_TUE = current_date.getDate() + 8;
    //var NEX_WED = current_date.getDate() + 9;
    //var NEX_THU = current_date.getDate() + 10;
    //var NEX_FRI = current_date.getDate() + 11;
    //var NEX_SAT = current_date.getDate() + 12;
    //var NEX_SUN = current_date.getDate() + 13;


    /*const M_SEC_MON_N = 8 * 24 * 60 * 60 * 1000;
    const NEX_MON = new Date(date.getTime() + M_SEC_MON_N);


    const M_SEC_TUE_N = 8 * 24 * 60 * 60 * 1000;
    const NEX_TUE = new Date(date.getTime() + M_SEC_TUE_N);


    const M_SEC_WED_N = 9 * 24 * 60 * 60 * 1000;
    const NEX_WED = new Date(date.getTime() + M_SEC_WED_N);


    const M_SEC_THU_N = 10 * 24 * 60 * 60 * 1000;
    const NEX_THU = new Date(date.getTime() + M_SEC_THU_N);


    const M_SEC_FRI_N = 11 * 24 * 60 * 60 * 1000;
    const NEX_FRI = new Date(date.getTime() + M_SEC_FRI_N); 


    const M_SEC_SAT_N = 12 * 24 * 60 * 60 * 1000;
    const NEX_SAT = new Date(date.getTime() + M_SEC_SAT_N);


    const M_SEC_SUN_N = 13 * 24 * 60 * 60 * 1000;
    const NEX_SUN = new Date(date.getTime() + M_SEC_SUN_N);*/

    /*//Monday
    document.getElementById('TTN_NEW_mon').innerText = CUR_MON + "-" + mm;
    document.getElementById('TTN_OLD_mon').innerText = CUR_MON + "-" + mm;
    //Tuesday
    document.getElementById('TTN_NEW_tue').innerText = CUR_TUE + "-" + mm;
    document.getElementById('TTN_OLD_tue').innerText = CUR_TUE + "-" + mm;
    //Wednesday
    document.getElementById('TTN_NEW_wed').innerText = CUR_WED + "-" + mm;
    document.getElementById('TTN_OLD_wed').innerText = CUR_WED + "-" + mm;
    //Thursday
    document.getElementById('TTN_NEW_thu').innerText = CUR_THU + "-" + mm;
    document.getElementById('TTN_OLD_thu').innerText = CUR_THU + "-" + mm;
    //Friday
    document.getElementById('TTN_NEW_fri').innerText = CUR_FRI + "-" + mm;
    document.getElementById('TTN_OLD_fri').innerText = CUR_FRI + "-" + mm;
    //Saturday
    document.getElementById('TTN_NEW_sat').innerText = CUR_SAT + "-" + mm;
    document.getElementById('TTN_OLD_sat').innerText = CUR_SAT + "-" + mm;
    //Sunday
    document.getElementById('TTN_NEW_sun').innerText = CUR_SUN + "-" + mm;
    document.getElementById('TTN_OLD_sun').innerText = CUR_SUN + "-" + mm;
    //DROPDOWN 1
    //Monday
    document.getElementById('DATE-CURR-MON').innerText = "Måndag  " + CUR_MON + "-" + mm;
    //Tuesday
    document.getElementById('DATE-CURR-TUE').innerText = "Tisdag  " + CUR_TUE + "-" + mm;
    //Wednesday
    document.getElementById('DATE-CURR-WED').innerText = "Onsdag  " + CUR_WED + "-" + mm;
    //Thursday
    document.getElementById('DATE-CURR-THU').innerText = "Torsdag  " + CUR_THU + "-" + mm;
    //Friday
    document.getElementById('DATE-CURR-FRI').innerText = "Fredag  " + CUR_FRI + "-" + mm;
    //Saturday
    document.getElementById('DATE-CURR-SAT').innerText = "Lördag  " + CUR_SAT + "-" + mm;
    //Sunday
    document.getElementById('DATE-CURR-SUN').innerText = "Söndag  " + CUR_SUN + "-" + mm;

    //DROPDOWN 2
    //Monday
    document.getElementById('DATE-NEXT-MON').innerText = "Måndag  " + NEX_MON + "-" + mm;
    //Tuesday
    document.getElementById('DATE-NEXT-TUE').innerText = "Tisdag  " + NEX_TUE + "-" + mm;
    //Wednesday
    document.getElementById('DATE-NEXT-WED').innerText = "Onsdag  " + NEX_WED + "-" + mm;
    //Thursday
    document.getElementById('DATE-NEXT-THU').innerText = "Torsdag  " + NEX_THU + "-" + mm;
    //Friday
    document.getElementById('DATE-NEXT-FRI').innerText = "Fredag  " + NEX_FRI + "-" + mm;
    //Saturday
    document.getElementById('DATE-NEXT-SAT').innerText = "Lördag  " + NEX_SAT + "-" + mm;
    //Sunday
    document.getElementById('DATE-NEXT-SUN').innerText = "Söndag  " + NEX_SUN + "-" + mm;*/
  /*}/*else if(day == 2){//Tuesday
      //var CUR_MON = current_date.getDate() - 1;
      //var CUR_TUE = current_date.getDate();
      //var CUR_WED = current_date.getDate() + 1;
      //var CUR_THU = current_date.getDate() + 2;
      //var CUR_FRI = current_date.getDate() + 3;
      //var CUR_SAT = current_date.getDate() + 4;
      //var CUR_SUN = current_date.getDate() + 5;
  
      const M_SEC_MON_C = 1 * 24 * 60 * 60 * 1000;
      const CUR_MON = new Date(date.getTime() - M_SEC_MON_C);
  
  
      const CUR_TUE = new Date(date.getTime());
  
  
      const M_SEC_WED_C = 1 * 24 * 60 * 60 * 1000;
      const CUR_WED = new Date(date.getTime() + M_SEC_WED_C);
  
  
      const M_SEC_THU_C = 2 * 24 * 60 * 60 * 1000;
      const CUR_THU = new Date(date.getTime() + M_SEC_THU_C);
  
  
      const M_SEC_FRI_C = 3 * 24 * 60 * 60 * 1000;
      const CUR_FRI = new Date(date.getTime() + M_SEC_FRI_C); 
  
  
      const M_SEC_SAT_C = 4 * 24 * 60 * 60 * 1000;
      const CUR_SAT = new Date(date.getTime() + M_SEC_SAT_C);
  
  
      const M_SEC_SUN_C = 5 * 24 * 60 * 60 * 1000;
      const CUR_SUN = new Date(date.getTime() + M_SEC_SUN_C);
  
  
      //var NEX_MON = current_date.getDate() + 6;
      //var NEX_TUE = current_date.getDate() + 7;
      //var NEX_WED = current_date.getDate() + 8;
      //var NEX_THU = current_date.getDate() + 9;
      //var NEX_FRI = current_date.getDate() + 10;
      //var NEX_SAT = current_date.getDate() + 11;
      //var NEX_SUN = current_date.getDate() + 12;
  
  
      const M_SEC_MON_N = 6 * 24 * 60 * 60 * 1000;
      const NEX_MON = new Date(date.getTime() + M_SEC_MON_N);
  
      const M_SEC_TUE_N = 7 * 24 * 60 * 60 * 1000;
      const NEX_TUE = new Date(date.getTime() + M_SEC_TUE_N);
  
  
      const M_SEC_WED_N = 8 * 24 * 60 * 60 * 1000;
      const NEX_WED = new Date(date.getTime() + M_SEC_WED_N);
  
  
      const M_SEC_THU_N = 9 * 24 * 60 * 60 * 1000;
      const NEX_THU = new Date(date.getTime() + M_SEC_THU_N);
  
  
      const M_SEC_FRI_N = 10 * 24 * 60 * 60 * 1000;
      const NEX_FRI = new Date(date.getTime() + M_SEC_FRI_N); 
  
  
      const M_SEC_SAT_N = 11 * 24 * 60 * 60 * 1000;
      const NEX_SAT = new Date(date.getTime() + M_SEC_SAT_N);
  
  
      const M_SEC_SUN_N = 12 * 24 * 60 * 60 * 1000;
      const NEX_SUN = new Date(date.getTime() + M_SEC_SUN_N);
  
      //Monday
      document.getElementById('TTN_NEW_mon').innerText = CUR_MON + "-" + mm;
      document.getElementById('TTN_OLD_mon').innerText = CUR_MON + "-" + mm;
      //Tuesday
      document.getElementById('TTN_NEW_tue').innerText = CUR_TUE + "-" + mm;
      document.getElementById('TTN_OLD_tue').innerText = CUR_TUE + "-" + mm;
      //Wednesday
      document.getElementById('TTN_NEW_wed').innerText = CUR_WED + "-" + mm;
      document.getElementById('TTN_OLD_wed').innerText = CUR_WED + "-" + mm;
      //Thursday
      document.getElementById('TTN_NEW_thu').innerText = CUR_THU + "-" + mm;
      document.getElementById('TTN_OLD_thu').innerText = CUR_THU + "-" + mm;
      //Friday
      document.getElementById('TTN_NEW_fri').innerText = CUR_FRI + "-" + mm;
      document.getElementById('TTN_OLD_fri').innerText = CUR_FRI + "-" + mm;
      //Saturday
      document.getElementById('TTN_NEW_sat').innerText = CUR_SAT + "-" + mm;
      document.getElementById('TTN_OLD_sat').innerText = CUR_SAT + "-" + mm;
      //Sunday
      document.getElementById('TTN_NEW_sun').innerText = CUR_SUN + "-" + mm;
      document.getElementById('TTN_OLD_sun').innerText = CUR_SUN + "-" + mm;
      //DROPDOWN 1
      //Monday
      document.getElementById('DATE-CURR-MON').innerText = "Måndag  " + CUR_MON + "-" + mm;
      //Tuesday
      document.getElementById('DATE-CURR-TUE').innerText = "Tisdag  " + CUR_TUE + "-" + mm;
      //Wednesday
      document.getElementById('DATE-CURR-WED').innerText = "Onsdag  " + CUR_WED + "-" + mm;
      //Thursday
      document.getElementById('DATE-CURR-THU').innerText = "Torsdag  " + CUR_THU + "-" + mm;
      //Friday
      document.getElementById('DATE-CURR-FRI').innerText = "Fredag  " + CUR_FRI + "-" + mm;
      //Saturday
      document.getElementById('DATE-CURR-SAT').innerText = "Lördag  " + CUR_SAT + "-" + mm;
      //Sunday
      document.getElementById('DATE-CURR-SUN').innerText = "Söndag  " + CUR_SUN + "-" + mm;
  
      //DROPDOWN 2
      //Monday
      document.getElementById('DATE-NEXT-MON').innerText = "Måndag  " + NEX_MON + "-" + mm;
      //Tuesday
      document.getElementById('DATE-NEXT-TUE').innerText = "Tisdag  " + NEX_TUE + "-" + mm;
      //Wednesday
      document.getElementById('DATE-NEXT-WED').innerText = "Onsdag  " + NEX_WED + "-" + mm;
      //Thursday
      document.getElementById('DATE-NEXT-THU').innerText = "Torsdag  " + NEX_THU + "-" + mm;
      //Friday
      document.getElementById('DATE-NEXT-FRI').innerText = "Fredag  " + NEX_FRI + "-" + mm;
      //Saturday
      document.getElementById('DATE-NEXT-SAT').innerText = "Lördag  " + NEX_SAT + "-" + mm;
      //Sunday
      document.getElementById('DATE-NEXT-SUN').innerText = "Söndag  " + NEX_SUN + "-" + mm;
  }else if(day == 3){//Wednesday
      //var CUR_MON = current_date.getDate() - 2;
      //var CUR_TUE = current_date.getDate() - 1;
      //var CUR_WED = current_date.getDate();
      //var CUR_THU = current_date.getDate() + 1;
      //var CUR_FRI = current_date.getDate() + 2;
      //var CUR_SAT = current_date.getDate() + 3;
      //var CUR_SUN = current_date.getDate() + 4;
  
      const M_SEC_MON_C = 2 * 24 * 60 * 60 * 1000;
      const CUR_MON = new Date(date.getTime() - M_SEC_MON_C);
  
      const M_SEC_TUE_C = 1 * 24 * 60 * 60 * 1000;
      const CUR_TUE = new Date(date.getTime() - M_SEC_TUE_C);
  
      const CUR_WED = new Date(date.getTime());
  
  
      const M_SEC_THU_C = 1 * 24 * 60 * 60 * 1000;
      const CUR_THU = new Date(date.getTime() + M_SEC_THU_C);
  
  
      const M_SEC_FRI_C = 2 * 24 * 60 * 60 * 1000;
      const CUR_FRI = new Date(date.getTime() + M_SEC_FRI_C); 
  
  
      const M_SEC_SAT_C = 3 * 24 * 60 * 60 * 1000;
      const CUR_SAT = new Date(date.getTime() + M_SEC_SAT_C);
  
  
      const M_SEC_SUN_C = 4 * 24 * 60 * 60 * 1000;
      const CUR_SUN = new Date(date.getTime() + M_SEC_SUN_C);
  
  
  
      //var NEX_MON = current_date.getDate() + 5;
      //var NEX_TUE = current_date.getDate() + 6;
      //var NEX_WED = current_date.getDate() + 7;
      //var NEX_THU = current_date.getDate() + 8;
      //var NEX_FRI = current_date.getDate() + 9;
      //var NEX_SAT = current_date.getDate() + 10;
      //var NEX_SUN = current_date.getDate() + 11;
  
      const M_SEC_MON_N = 5 * 24 * 60 * 60 * 1000;
      const NEX_MON = new Date(date.getTime() + M_SEC_MON_N);
  
      const M_SEC_TUE_N = 6 * 24 * 60 * 60 * 1000;
      const NEX_TUE = new Date(date.getTime() + M_SEC_TUE_N);
  
  
      const M_SEC_WED_N = 7 * 24 * 60 * 60 * 1000;
      const NEX_WED = new Date(date.getTime() + M_SEC_WED_N);
  
  
      const M_SEC_THU_N = 8 * 24 * 60 * 60 * 1000;
      const NEX_THU = new Date(date.getTime() + M_SEC_THU_N);
  
  
      const M_SEC_FRI_N = 9 * 24 * 60 * 60 * 1000;
      const NEX_FRI = new Date(date.getTime() + M_SEC_FRI_N); 
  
  
      const M_SEC_SAT_N = 10 * 24 * 60 * 60 * 1000;
      const NEX_SAT = new Date(date.getTime() + M_SEC_SAT_N);
  
  
      const M_SEC_SUN_N = 11 * 24 * 60 * 60 * 1000;
      const NEX_SUN = new Date(date.getTime() + M_SEC_SUN_N);
  
      //Monday
      document.getElementById('TTN_NEW_mon').innerText = CUR_MON + "-" + mm;
      document.getElementById('TTN_OLD_mon').innerText = CUR_MON + "-" + mm;
      //Tuesday
      document.getElementById('TTN_NEW_tue').innerText = CUR_TUE + "-" + mm;
      document.getElementById('TTN_OLD_tue').innerText = CUR_TUE + "-" + mm;
      //Wednesday
      document.getElementById('TTN_NEW_wed').innerText = CUR_WED + "-" + mm;
      document.getElementById('TTN_OLD_wed').innerText = CUR_WED + "-" + mm;
      //Thursday
      document.getElementById('TTN_NEW_thu').innerText = CUR_THU + "-" + mm;
      document.getElementById('TTN_OLD_thu').innerText = CUR_THU + "-" + mm;
      //Friday
      document.getElementById('TTN_NEW_fri').innerText = CUR_FRI + "-" + mm;
      document.getElementById('TTN_OLD_fri').innerText = CUR_FRI + "-" + mm;
      //Saturday
      document.getElementById('TTN_NEW_sat').innerText = CUR_SAT + "-" + mm;
      document.getElementById('TTN_OLD_sat').innerText = CUR_SAT + "-" + mm;
      //Sunday
      document.getElementById('TTN_NEW_sun').innerText = CUR_SUN + "-" + mm;
      document.getElementById('TTN_OLD_sun').innerText = CUR_SUN + "-" + mm;
      //DROPDOWN 1
      //Monday
      document.getElementById('DATE-CURR-MON').innerText = "Måndag  " + CUR_MON + "-" + mm;
      //Tuesday
      document.getElementById('DATE-CURR-TUE').innerText = "Tisdag  " + CUR_TUE + "-" + mm;
      //Wednesday
      document.getElementById('DATE-CURR-WED').innerText = "Onsdag  " + CUR_WED + "-" + mm;
      //Thursday
      document.getElementById('DATE-CURR-THU').innerText = "Torsdag  " + CUR_THU + "-" + mm;
      //Friday
      document.getElementById('DATE-CURR-FRI').innerText = "Fredag  " + CUR_FRI + "-" + mm;
      //Saturday
      document.getElementById('DATE-CURR-SAT').innerText = "Lördag  " + CUR_SAT + "-" + mm;
      //Sunday
      document.getElementById('DATE-CURR-SUN').innerText = "Söndag  " + CUR_SUN + "-" + mm;
  
      //DROPDOWN 2
      //Monday
      document.getElementById('DATE-NEXT-MON').innerText = "Måndag  " + NEX_MON + "-" + mm;
      //Tuesday
      document.getElementById('DATE-NEXT-TUE').innerText = "Tisdag  " + NEX_TUE + "-" + mm;
      //Wednesday
      document.getElementById('DATE-NEXT-WED').innerText = "Onsdag  " + NEX_WED + "-" + mm;
      //Thursday
      document.getElementById('DATE-NEXT-THU').innerText = "Torsdag  " + NEX_THU + "-" + mm;
      //Friday
      document.getElementById('DATE-NEXT-FRI').innerText = "Fredag  " + NEX_FRI + "-" + mm;
      //Saturday
      document.getElementById('DATE-NEXT-SAT').innerText = "Lördag  " + NEX_SAT + "-" + mm;
      //Sunday
      document.getElementById('DATE-NEXT-SUN').innerText = "Söndag  " + NEX_SUN + "-" + mm;
  }else if(day == 4){//Thursday
      //var CUR_MON = current_date.getDate() - 3;
      //var CUR_TUE = current_date.getDate() - 2;
      //var CUR_WED = current_date.getDate() - 1;
      //var CUR_THU = current_date.getDate();
      //var CUR_FRI = current_date.getDate() + 1;
      //var CUR_SAT = current_date.getDate() + 2;
      //var CUR_SUN = current_date.getDate() + 3;
  
      const M_SEC_MON_C = 6 * 24 * 60 * 60 * 1000;
      const CUR_MON = new Date(date.getTime() + M_SEC_MON_C);
  
      const M_SEC_TUE_C = 7 * 24 * 60 * 60 * 1000;
      const CUR_TUE = new Date(date.getTime() + M_SEC_TUE_C);
  
  
      const M_SEC_WED_C = 8 * 24 * 60 * 60 * 1000;
      const CUR_WED = new Date(date.getTime() + M_SEC_WED_C);
  
  
      const M_SEC_THU_C = 9 * 24 * 60 * 60 * 1000;
      const CUR_THU = new Date(date.getTime() + M_SEC_THU_C);
  
  
      const M_SEC_FRI_C = 10 * 24 * 60 * 60 * 1000;
      const CUR_FRI = new Date(date.getTime() + M_SEC_FRI_C); 
  
  
      const M_SEC_SAT_C = 11 * 24 * 60 * 60 * 1000;
      const CUR_SAT = new Date(date.getTime() + M_SEC_SAT_C);
  
  
      const M_SEC_SUN_C = 12 * 24 * 60 * 60 * 1000;
      const CUR_SUN = new Date(date.getTime() + M_SEC_SUN_C);
  
      //var NEX_MON = current_date.getDate() + 4;
      //var NEX_TUE = current_date.getDate() + 5;
      //var NEX_WED = current_date.getDate() + 6;
      //var NEX_THU = current_date.getDate() + 7;
      //var NEX_FRI = current_date.getDate() + 8;
      //var NEX_SAT = current_date.getDate() + 9;
      //var NEX_SUN = current_date.getDate() + 10;
  
      const M_SEC_MON_N = 4 * 24 * 60 * 60 * 1000;
      const NEX_MON = new Date(date.getTime() + M_SEC_MON_N);
  
      const M_SEC_TUE_N = 5 * 24 * 60 * 60 * 1000;
      const NEX_TUE = new Date(date.getTime() + M_SEC_TUE_N);
  
  
      const M_SEC_WED_N = 6 * 24 * 60 * 60 * 1000;
      const NEX_WED = new Date(date.getTime() + M_SEC_WED_N);
  
  
      const M_SEC_THU_N = 7 * 24 * 60 * 60 * 1000;
      const NEX_THU = new Date(date.getTime() + M_SEC_THU_N);
  
  
      const M_SEC_FRI_N = 8 * 24 * 60 * 60 * 1000;
      const NEX_FRI = new Date(date.getTime() + M_SEC_FRI_N); 
  
  
      const M_SEC_SAT_N = 9 * 24 * 60 * 60 * 1000;
      const NEX_SAT = new Date(date.getTime() + M_SEC_SAT_N);
  
  
      const M_SEC_SUN_N = 10 * 24 * 60 * 60 * 1000;
      const NEX_SUN = new Date(date.getTime() + M_SEC_SUN_N);
  
      //Monday
      document.getElementById('TTN_NEW_mon').innerText = CUR_MON + "-" + mm;
      document.getElementById('TTN_OLD_mon').innerText = CUR_MON + "-" + mm;
      //Tuesday
      document.getElementById('TTN_NEW_tue').innerText = CUR_TUE + "-" + mm;
      document.getElementById('TTN_OLD_tue').innerText = CUR_TUE + "-" + mm;
      //Wednesday
      document.getElementById('TTN_NEW_wed').innerText = CUR_WED + "-" + mm;
      document.getElementById('TTN_OLD_wed').innerText = CUR_WED + "-" + mm;
      //Thursday
      document.getElementById('TTN_NEW_thu').innerText = CUR_THU + "-" + mm;
      document.getElementById('TTN_OLD_thu').innerText = CUR_THU + "-" + mm;
      //Friday
      document.getElementById('TTN_NEW_fri').innerText = CUR_FRI + "-" + mm;
      document.getElementById('TTN_OLD_fri').innerText = CUR_FRI + "-" + mm;
      //Saturday
      document.getElementById('TTN_NEW_sat').innerText = CUR_SAT + "-" + mm;
      document.getElementById('TTN_OLD_sat').innerText = CUR_SAT + "-" + mm;
      //Sunday
      document.getElementById('TTN_NEW_sun').innerText = CUR_SUN + "-" + mm;
      document.getElementById('TTN_OLD_sun').innerText = CUR_SUN + "-" + mm;
      //DROPDOWN 1
      //Monday
      document.getElementById('DATE-CURR-MON').innerText = "Måndag  " + CUR_MON + "-" + mm;
      //Tuesday
      document.getElementById('DATE-CURR-TUE').innerText = "Tisdag  " + CUR_TUE + "-" + mm;
      //Wednesday
      document.getElementById('DATE-CURR-WED').innerText = "Onsdag  " + CUR_WED + "-" + mm;
      //Thursday
      document.getElementById('DATE-CURR-THU').innerText = "Torsdag  " + CUR_THU + "-" + mm;
      //Friday
      document.getElementById('DATE-CURR-FRI').innerText = "Fredag  " + CUR_FRI + "-" + mm;
      //Saturday
      document.getElementById('DATE-CURR-SAT').innerText = "Lördag  " + CUR_SAT + "-" + mm;
      //Sunday
      document.getElementById('DATE-CURR-SUN').innerText = "Söndag  " + CUR_SUN + "-" + mm;
  
      //DROPDOWN 2
      //Monday
      document.getElementById('DATE-NEXT-MON').innerText = "Måndag  " + NEX_MON + "-" + mm;
      //Tuesday
      document.getElementById('DATE-NEXT-TUE').innerText = "Tisdag  " + NEX_TUE + "-" + mm;
      //Wednesday
      document.getElementById('DATE-NEXT-WED').innerText = "Onsdag  " + NEX_WED + "-" + mm;
      //Thursday
      document.getElementById('DATE-NEXT-THU').innerText = "Torsdag  " + NEX_THU + "-" + mm;
      //Friday
      document.getElementById('DATE-NEXT-FRI').innerText = "Fredag  " + NEX_FRI + "-" + mm;
      //Saturday
      document.getElementById('DATE-NEXT-SAT').innerText = "Lördag  " + NEX_SAT + "-" + mm;
      //Sunday
      document.getElementById('DATE-NEXT-SUN').innerText = "Söndag  " + NEX_SUN + "-" + mm;
  }else if(day == 5){//Friday
      //var CUR_MON = current_date.getDate() - 4;
      //var CUR_TUE = current_date.getDate() - 3;
      //var CUR_WED = current_date.getDate() - 2;
      //var CUR_THU = current_date.getDate() - 1;
      //var CUR_FRI = current_date.getDate();
      //var CUR_SAT = current_date.getDate() + 1;
      //var CUR_SUN = current_date.getDate() + 2;
  
      const M_SEC_MON_C = 4 * 24 * 60 * 60 * 1000;
      const CUR_MON = new Date(date.getTime() - M_SEC_MON_C);
  
      const M_SEC_TUE_C = 3 * 24 * 60 * 60 * 1000;
      const CUR_TUE = new Date(date.getTime() - M_SEC_TUE_C);
  
  
      const M_SEC_WED_C = 2 * 24 * 60 * 60 * 1000;
      const CUR_WED = new Date(date.getTime() - M_SEC_WED_C);
  
  
      const M_SEC_THU_C = 1 * 24 * 60 * 60 * 1000;
      const CUR_THU = new Date(date.getTime() - M_SEC_THU_C);
  
  
      const CUR_FRI = new Date(date.getTime()); 
  
  
      const M_SEC_SAT_C = 1 * 24 * 60 * 60 * 1000;
      const CUR_SAT = new Date(date.getTime() + M_SEC_SAT_C);
  
  
      const M_SEC_SUN_C = 2 * 24 * 60 * 60 * 1000;
      const CUR_SUN = new Date(date.getTime() + M_SEC_SUN_C);
  
      //var NEX_MON = current_date.getDate() + 3;
      //var NEX_TUE = current_date.getDate() + 4;
      //var NEX_WED = current_date.getDate() + 5;
      //var NEX_THU = current_date.getDate() + 6;
      //var NEX_FRI = current_date.getDate() + 7;
      //var NEX_SAT = current_date.getDate() + 8;
      //var NEX_SUN = current_date.getDate() + 9;
  
      const M_SEC_MON_N = 3 * 24 * 60 * 60 * 1000;
      const NEX_MON = new Date(date.getTime() + M_SEC_MON_N);
  
      const M_SEC_TUE_N = 4 * 24 * 60 * 60 * 1000;
      const NEX_TUE = new Date(date.getTime() + M_SEC_TUE_N);
  
  
      const M_SEC_WED_N = 5 * 24 * 60 * 60 * 1000;
      const NEX_WED = new Date(date.getTime() + M_SEC_WED_N);
  
  
      const M_SEC_THU_N = 6 * 24 * 60 * 60 * 1000;
      const NEX_THU = new Date(date.getTime() + M_SEC_THU_N);
  
  
      const M_SEC_FRI_N = 7 * 24 * 60 * 60 * 1000;
      const NEX_FRI = new Date(date.getTime() + M_SEC_FRI_N); 
  
  
      const M_SEC_SAT_N = 8 * 24 * 60 * 60 * 1000;
      const NEX_SAT = new Date(date.getTime() + M_SEC_SAT_N);
  
  
      const M_SEC_SUN_N = 9 * 24 * 60 * 60 * 1000;
      const NEX_SUN = new Date(date.getTime() + M_SEC_SUN_N);
  
      //Monday
      document.getElementById('TTN_NEW_mon').innerText = CUR_MON + "-" + mm;
      document.getElementById('TTN_OLD_mon').innerText = CUR_MON + "-" + mm;
      //Tuesday
      document.getElementById('TTN_NEW_tue').innerText = CUR_TUE + "-" + mm;
      document.getElementById('TTN_OLD_tue').innerText = CUR_TUE + "-" + mm;
      //Wednesday
      document.getElementById('TTN_NEW_wed').innerText = CUR_WED + "-" + mm;
      document.getElementById('TTN_OLD_wed').innerText = CUR_WED + "-" + mm;
      //Thursday
      document.getElementById('TTN_NEW_thu').innerText = CUR_THU + "-" + mm;
      document.getElementById('TTN_OLD_thu').innerText = CUR_THU + "-" + mm;
      //Friday
      document.getElementById('TTN_NEW_fri').innerText = CUR_FRI + "-" + mm;
      document.getElementById('TTN_OLD_fri').innerText = CUR_FRI + "-" + mm;
      //Saturday
      document.getElementById('TTN_NEW_sat').innerText = CUR_SAT + "-" + mm;
      document.getElementById('TTN_OLD_sat').innerText = CUR_SAT + "-" + mm;
      //Sunday
      document.getElementById('TTN_NEW_sun').innerText = CUR_SUN + "-" + mm;
      document.getElementById('TTN_OLD_sun').innerText = CUR_SUN + "-" + mm;
      //DROPDOWN 1
      //Monday
      document.getElementById('DATE-CURR-MON').innerText = "Måndag  " + CUR_MON + "-" + mm;
      //Tuesday
      document.getElementById('DATE-CURR-TUE').innerText = "Tisdag  " + CUR_TUE + "-" + mm;
      //Wednesday
      document.getElementById('DATE-CURR-WED').innerText = "Onsdag  " + CUR_WED + "-" + mm;
      //Thursday
      document.getElementById('DATE-CURR-THU').innerText = "Torsdag  " + CUR_THU + "-" + mm;
      //Friday
      document.getElementById('DATE-CURR-FRI').innerText = "Fredag  " + CUR_FRI + "-" + mm;
      //Saturday
      document.getElementById('DATE-CURR-SAT').innerText = "Lördag  " + CUR_SAT + "-" + mm;
      //Sunday
      document.getElementById('DATE-CURR-SUN').innerText = "Söndag  " + CUR_SUN + "-" + mm;
  
      //DROPDOWN 2
      //Monday
      document.getElementById('DATE-NEXT-MON').innerText = "Måndag  " + NEX_MON + "-" + mm;
      //Tuesday
      document.getElementById('DATE-NEXT-TUE').innerText = "Tisdag  " + NEX_TUE + "-" + mm;
      //Wednesday
      document.getElementById('DATE-NEXT-WED').innerText = "Onsdag  " + NEX_WED + "-" + mm;
      //Thursday
      document.getElementById('DATE-NEXT-THU').innerText = "Torsdag  " + NEX_THU + "-" + mm;
      //Friday
      document.getElementById('DATE-NEXT-FRI').innerText = "Fredag  " + NEX_FRI + "-" + mm;
      //Saturday
      document.getElementById('DATE-NEXT-SAT').innerText = "Lördag  " + NEX_SAT + "-" + mm;
      //Sunday
      document.getElementById('DATE-NEXT-SUN').innerText = "Söndag  " + NEX_SUN + "-" + mm;
  }else if(day == 6){//Saturday
      //var CUR_MON = current_date.getDate() - 5;
      //var CUR_TUE = current_date.getDate() - 4;
      //var CUR_WED = current_date.getDate() - 3;
      //var CUR_THU = current_date.getDate() - 2;
      //var CUR_FRI = current_date.getDate() - 1;
      //var CUR_SAT = current_date.getDate();
      //var CUR_SUN = current_date.getDate() + 1;
  
  
      const M_SEC_MON_C = 5 * 24 * 60 * 60 * 1000;
      const CUR_MON = new Date(date.getTime() - M_SEC_MON_C);
  
      const M_SEC_TUE_C = 4 * 24 * 60 * 60 * 1000;
      const CUR_TUE = new Date(date.getTime() - M_SEC_TUE_C);
  
  
      const M_SEC_WED_C = 3 * 24 * 60 * 60 * 1000;
      const CUR_WED = new Date(date.getTime() - M_SEC_WED_C);
  
  
      const M_SEC_THU_C = 2 * 24 * 60 * 60 * 1000;
      const CUR_THU = new Date(date.getTime() - M_SEC_THU_C);
  
  
      const M_SEC_FRI_C = 1 * 24 * 60 * 60 * 1000;
      const CUR_FRI = new Date(date.getTime() - M_SEC_FRI_C); 
  
  
      const CUR_SAT = new Date(date.getTime());
  
  
      const M_SEC_SUN_C = 1 * 24 * 60 * 60 * 1000;
      const CUR_SUN = new Date(date.getTime() + M_SEC_SUN_C);
  
      //var NEX_MON = current_date.getDate() + 2;
      //var NEX_TUE = current_date.getDate() + 3;
      //var NEX_WED = current_date.getDate() + 4;
      //var NEX_THU = current_date.getDate() + 5;
      //var NEX_FRI = current_date.getDate() + 6;
      //var NEX_SAT = current_date.getDate() + 7;
      //var NEX_SUN = current_date.getDate() + 8;
  
  
      const M_SEC_MON_N = 2 * 24 * 60 * 60 * 1000;
      const NEX_MON = new Date(date.getTime() + M_SEC_MON_N);
  
      const M_SEC_TUE_N = 3 * 24 * 60 * 60 * 1000;
      const NEX_TUE = new Date(date.getTime() + M_SEC_TUE_N);
  
  
      const M_SEC_WED_N = 4 * 24 * 60 * 60 * 1000;
      const NEX_WED = new Date(date.getTime() + M_SEC_WED_N);
  
  
      const M_SEC_THU_N = 5 * 24 * 60 * 60 * 1000;
      const NEX_THU = new Date(date.getTime() + M_SEC_THU_N);
  
  
      const M_SEC_FRI_N = 6 * 24 * 60 * 60 * 1000;
      const NEX_FRI = new Date(date.getTime() + M_SEC_FRI_N); 
  
  
      const M_SEC_SAT_N = 7 * 24 * 60 * 60 * 1000;
      const NEX_SAT = new Date(date.getTime() + M_SEC_SAT_N);
  
  
      const M_SEC_SUN_N = 8 * 24 * 60 * 60 * 1000;
      const NEX_SUN = new Date(date.getTime() + M_SEC_SUN_N);
  
      //Monday
      document.getElementById('TTN_NEW_mon').innerText = CUR_MON + "-" + mm;
      document.getElementById('TTN_OLD_mon').innerText = CUR_MON + "-" + mm;
      //Tuesday
      document.getElementById('TTN_NEW_tue').innerText = CUR_TUE + "-" + mm;
      document.getElementById('TTN_OLD_tue').innerText = CUR_TUE + "-" + mm;
      //Wednesday
      document.getElementById('TTN_NEW_wed').innerText = CUR_WED + "-" + mm;
      document.getElementById('TTN_OLD_wed').innerText = CUR_WED + "-" + mm;
      //Thursday
      document.getElementById('TTN_NEW_thu').innerText = CUR_THU + "-" + mm;
      document.getElementById('TTN_OLD_thu').innerText = CUR_THU + "-" + mm;
      //Friday
      document.getElementById('TTN_NEW_fri').innerText = CUR_FRI + "-" + mm;
      document.getElementById('TTN_OLD_fri').innerText = CUR_FRI + "-" + mm;
      //Saturday
      document.getElementById('TTN_NEW_sat').innerText = CUR_SAT + "-" + mm;
      document.getElementById('TTN_OLD_sat').innerText = CUR_SAT + "-" + mm;
      //Sunday
      document.getElementById('TTN_NEW_sun').innerText = CUR_SUN + "-" + mm;
      document.getElementById('TTN_OLD_sun').innerText = CUR_SUN + "-" + mm;
      //DROPDOWN 1
      //Monday
      document.getElementById('DATE-CURR-MON').innerText = "Måndag  " + CUR_MON + "-" + mm;
      //Tuesday
      document.getElementById('DATE-CURR-TUE').innerText = "Tisdag  " + CUR_TUE + "-" + mm;
      //Wednesday
      document.getElementById('DATE-CURR-WED').innerText = "Onsdag  " + CUR_WED + "-" + mm;
      //Thursday
      document.getElementById('DATE-CURR-THU').innerText = "Torsdag  " + CUR_THU + "-" + mm;
      //Friday
      document.getElementById('DATE-CURR-FRI').innerText = "Fredag  " + CUR_FRI + "-" + mm;
      //Saturday
      document.getElementById('DATE-CURR-SAT').innerText = "Lördag  " + CUR_SAT + "-" + mm;
      //Sunday
      document.getElementById('DATE-CURR-SUN').innerText = "Söndag  " + CUR_SUN + "-" + mm;
  
      //DROPDOWN 2
      //Monday
      document.getElementById('DATE-NEXT-MON').innerText = "Måndag  " + NEX_MON + "-" + mm;
      //Tuesday
      document.getElementById('DATE-NEXT-TUE').innerText = "Tisdag  " + NEX_TUE + "-" + mm;
      //Wednesday
      document.getElementById('DATE-NEXT-WED').innerText = "Onsdag  " + NEX_WED + "-" + mm;
      //Thursday
      document.getElementById('DATE-NEXT-THU').innerText = "Torsdag  " + NEX_THU + "-" + mm;
      //Friday
      document.getElementById('DATE-NEXT-FRI').innerText = "Fredag  " + NEX_FRI + "-" + mm;
      //Saturday
      document.getElementById('DATE-NEXT-SAT').innerText = "Lördag  " + NEX_SAT + "-" + mm;
      //Sunday
      document.getElementById('DATE-NEXT-SUN').innerText = "Söndag  " + NEX_SUN + "-" + mm;
  }
}*/