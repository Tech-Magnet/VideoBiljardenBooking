<?php
// database connection code
if(isset($_POST['txtName']))
{
  $txtName = $_POST['txtName'];
  $txtPhone = $_POST['txtPhone'];
  $txtDate = $_POST['txtDate'];
  $txtTime = $_POST['txtTime'];
  $txtTable = $_POST['txtTable'];
  $txtLength = $_POST['txtLength'];


  for ($i = 0; $i < $txtLength; $i++) {
    $con = mysqli_connect('localhost', 'id21042321_admin', 'nNASGE!yM!dH9hj5','id21042321_booking');

    // get the post records

    

    // database insert SQL code
    $sql = "INSERT INTO `Booked` VALUES ('0', '$txtName', '$txtPhone', '$txtDate', '$txtTime', '$txtTable')";

    // insert in database 
    $rs = mysqli_query($con, $sql);
    if($rs)
    {
    	echo "Booking Records Inserted";
      $txtTime = $txtTime + 1;
    }
} 
}
$con = mysqli_connect('localhost', 'id21042321_admin', 'nNASGE!yM!dH9hj5','id21042321_booking');
$result = mysqli_query($con,"SELECT * FROM `Booked`");
$data = $result->fetch_all(MYSQLI_ASSOC);
?>


<!DOCTYPE html>
<html lang="en" id="html-tag">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Boka ett Bord</title>
<link href="style.css" rel="stylesheet">
<script type="text/javascript" src="main.js"></script>
<link rel="icon" href="img/icon.png">
</head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TMPN0CGN95"></script>
<script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TMPN0CGN95');
</script>
<body class="bg-light" onload="Start();">
  <script>
    

    function getDay() {
      let day = current_date.getDay();
      let dd = String(current_date.getDate()).padStart(2, '0');
      return dd;
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




      const current_date = new Date();
      //current_date = new Date("2023-07-28");
      let day = current_date.getDay();
      let dd = String(current_date.getDate()).padStart(2, '0');
	    let mm = String(current_date.getMonth() + 1).padStart(2, '0');
      console.log("DAY: " + dd);
      console.log("MONTH: " + mm);
      console.log("CURRENT WEEKDAY: " + day);


      if(day == 0){//Sunday
        document.getElementById('TTN_NEW_sun').innerText = dd + "-" + mm;
        document.getElementById('TTN_OLD_sun').innerText = dd + "-" + mm;
      }else if(day == 1){//Monday
        document.getElementById('TTN_NEW_mon').innerText = dd + "-" + mm;
        document.getElementById('TTN_OLD_mon').innerText = dd + "-" + mm;
      }else if(day == 2){//Tuesday
        document.getElementById('TTN_NEW_tue').innerText = dd + "-" + mm;
        document.getElementById('TTN_OLD_tue').innerText = dd + "-" + mm;
      }else if(day == 3){//Wednesday
        document.getElementById('TTN_NEW_wed').innerText = dd + "-" + mm;
        document.getElementById('TTN_OLD_wed').innerText = dd + "-" + mm;
      }else if(day == 4){//Thursday
        document.getElementById('TTN_NEW_thu').innerText = dd + "-" + mm;
        document.getElementById('TTN_OLD_thu').innerText = dd + "-" + mm;
      }else if(day == 5){//Friday
        document.getElementById('TTN_NEW_fri').innerText = dd + "-" + mm;
        document.getElementById('TTN_OLD_fri').innerText = dd + "-" + mm;
      }else if(day == 6){//Saturday
        var CUR_MON = String(current_date.getDate() - 5).padStart(2, '0');
        var CUR_TUE = String(current_date.getDate() - 4).padStart(2, '0');
        var CUR_WED = String(current_date.getDate() - 3).padStart(2, '0');
        var CUR_THU = String(current_date.getDate() - 2).padStart(2, '0');
        var CUR_FRI = String(current_date.getDate() - 1).padStart(2, '0');
        var CUR_SAT = String(current_date.getDate()).padStart(2, '0');
        var CUR_SUN = String(current_date.getDate() + 1).padStart(2, '0');

        var NEX_MON = String(current_date.getDate() + 2).padStart(2, '0');
        var NEX_TUE = String(current_date.getDate() + 3).padStart(2, '0');
        var NEX_WED = String(current_date.getDate() + 4).padStart(2, '0');
        var NEX_THU = String(current_date.getDate() + 5).padStart(2, '0');
        var NEX_FRI = String(current_date.getDate() + 6).padStart(2, '0');
        var NEX_SAT = String(current_date.getDate() + 7).padStart(2, '0');
        var NEX_SUN = String(current_date.getDate() + 8).padStart(2, '0');

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

        /*//DROPDOWN 2
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
      }


    }
  </script>
  <div class="container">
    <div class="py-5 text-center">
      <a href="https://www.orebrobiljarden.se/"><img class="d-block mx-auto mb-4" src="img/biljard.jpg" height="140px"></a>
      <h2>Boka Bord - Snooker</h2>
    </div>
  <fieldset>
    <form id="myForm" name="frmBook" class="needs-validation " method="post" action="index.php">
      <p>
        <label for="Name">Namn</label>
        <input type="text" class="form-control" name="txtName" id="txtName" placeholder="Namn" value="" required>
      </p>
      <p>
        <label for="phone">Telnr</label>
        <input type="text"  class="form-control" name="txtPhone" id="txtPhone" placeholder="0701234567" value="" required>
      </p>
      <p>
        <label for="date">Datum</label>
        <select id="txtDate" name="txtDate" style="padding: 10px;">
          <!--Week One (Current)-->
          <option id="DATE-CURR-MON" value="1">M&aringndag</option>
          <option id="DATE-CURR-TUE" value="2">Tisdag</option>
          <option id="DATE-CURR-WED" value="3">Ondsdag</option>
          <option id="DATE-CURR-THU" value="4">Torsdag</option>
          <option id="DATE-CURR-FRI" value="5">Fredag</option>
          <option id="DATE-CURR-SAT" value="6">L&oumlrdag</option>
          <option id="DATE-CURR-SUN" value="0">S&oumlndag</option>
          <!--NEXT WEEK-->
          <option id="DATE-NEXT-MON" value="8">M&aringndag</option>
          <option id="DATE-NEXT-TUE" value="9">Tisdag</option>
          <option id="DATE-NEXT-WED" value="10">Onsdag</option>
          <option id="DATE-NEXT-THU" value="11">Torsdag</option>
          <option id="DATE-NEXT-FRI" value="12">Fredag</option>
          <option id="DATE-NEXT-SAT" value="13">L&oumlrdag</option>
          <option id="DATE-NEXT-SUN" value="7">S&oumlndag</option>
        </select>
      </p>
      <p>
        <label for="time">Tid</label>
        <select id="txtTime" name="txtTime" style="padding: 10px;">
          <option value="15">15.00</option>
          <option value="16">16.00</option>
          <option value="17">17.00</option>
          <option value="18">18.00</option>
          <option value="19">19.00</option>
          <option value="20">20.00</option>
          <option value="21">21.00</option>
          <option value="22">22.00</option>
          <option value="23">23.00</option>
        </select>
      </p>
      <p>
        <label for="date">L&aumlngd (Timmar)</label>
        <input type="number"  class="form-control"  name="txtLength" id="txtLength" placeholder="" value="1" required>
      </p>
      <p>
        <label for="txtTable">Bord</label>
        <select id="txtTable" name="txtTable" style="padding: 10px;">
          <option value="Bord_1">Bord 1</option>
          <option value="Bord_2">Bord 2</option>
        </select>
      </p>
      <p>&nbsp;</p>
      <p>
        <input type="button" name="button" id="smt-button" value="Boka Bord"  class="btn btn-primary btn-lg btn-block" onclick="CheckSubmit()">
      </p>
    </form>
  </fieldset>

  </div>
  <div style="padding-left: 50px">
    <h3>Aktiva Bokingar</h3>
    <table border="1" id="dbTable">
    <tr>
      <th>Datum</th>
      <th>Tid</th>
      <th>Bord</th>
    </tr>
    <?php foreach($data as $row): ?>
    <tr>
      <td><?= htmlspecialchars($row['fldDate']) ?></td>
      <td><?= htmlspecialchars($row['fldTime']) ?></td>
      <td><?= htmlspecialchars($row['fldTable']) ?></td>
    </tr>
    <?php endforeach ?>
    </table>
  </div>
  <div class="row">
    <div class="column"></div>
    <div class="column">
  <div>
    <h2 style="padding-left: 10px;">Bord 1</h2>
    <div class="grid-container">
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">M&aringndag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">Tisdag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">Onsdag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">Torsdag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">Fredag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">L&oumlrdag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">S&oumlndag</div>
    <div class="grid-item" id="TTN_NEW_mon" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_NEW_tue" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_NEW_wed" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_NEW_thu" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_NEW_fri" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_NEW_sat" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_NEW_sun" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TT_NEW_13_mon" style="background-color: #000;">13.00</div>
    <div class="grid-item" id="TT_NEW_13_tue" style="background-color: #000;">13.00</div>
    <div class="grid-item" id="TT_NEW_13_wed" style="background-color: #000;">13.00</div>
    <div class="grid-item" id="TT_NEW_13_thu" style="background-color: #000;">13.00</div>
    <div class="grid-item" id="TT_NEW_13_fri">13.00</div>
    <div class="grid-item" id="TT_NEW_13_sat">13.00</div>
    <div class="grid-item" id="TT_NEW_13_sun" style="background-color: #000;">13.00</div>
    <div class="grid-item" id="TT_NEW_14_mon" style="background-color: #000;">14.00</div>
    <div class="grid-item" id="TT_NEW_14_tue" style="background-color: #000;">14.00</div>
    <div class="grid-item" id="TT_NEW_14_wed" style="background-color: #000;">14.00</div>
    <div class="grid-item" id="TT_NEW_14_thu" style="background-color: #000;">14.00</div>
    <div class="grid-item" id="TT_NEW_14_fri">14.00</div>
    <div class="grid-item" id="TT_NEW_14_sat">14.00</div>
    <div class="grid-item" id="TT_NEW_14_sun" style="background-color: #000;">14.00</div>
    <div class="grid-item" id="TT_NEW_15_mon">15.00</div>
    <div class="grid-item" id="TT_NEW_15_tue">15.00</div>
    <div class="grid-item" id="TT_NEW_15_wed">15.00</div>
    <div class="grid-item" id="TT_NEW_15_thu">15.00</div>
    <div class="grid-item" id="TT_NEW_15_fri">15.00</div>
    <div class="grid-item" id="TT_NEW_15_sat">15.00</div>
    <div class="grid-item" id="TT_NEW_15_sun">15.00</div>
    <div class="grid-item" id="TT_NEW_16_mon">16.00</div>
    <div class="grid-item" id="TT_NEW_16_tue">16.00</div>
    <div class="grid-item" id="TT_NEW_16_wed">16.00</div>
    <div class="grid-item" id="TT_NEW_16_thu">16.00</div>
    <div class="grid-item" id="TT_NEW_16_fri">16.00</div>
    <div class="grid-item" id="TT_NEW_16_sat">16.00</div>
    <div class="grid-item" id="TT_NEW_16_sun">16.00</div>
    <div class="grid-item" id="TT_NEW_17_mon">17.00</div>
    <div class="grid-item" id="TT_NEW_17_tue">17.00</div>
    <div class="grid-item" id="TT_NEW_17_wed">17.00</div>
    <div class="grid-item" id="TT_NEW_17_thu">17.00</div>
    <div class="grid-item" id="TT_NEW_17_fri">17.00</div>
    <div class="grid-item" id="TT_NEW_17_sat">17.00</div>
    <div class="grid-item" id="TT_NEW_17_sun">17.00</div>
    <div class="grid-item" id="TT_NEW_18_mon">18.00</div>
    <div class="grid-item" id="TT_NEW_18_tue">18.00</div>
    <div class="grid-item" id="TT_NEW_18_wed">18.00</div>
    <div class="grid-item" id="TT_NEW_18_thu">18.00</div>
    <div class="grid-item" id="TT_NEW_18_fri">18.00</div>
    <div class="grid-item" id="TT_NEW_18_sat">18.00</div>
    <div class="grid-item" id="TT_NEW_18_sun">18.00</div>
    <div class="grid-item" id="TT_NEW_19_mon">19.00</div>
    <div class="grid-item" id="TT_NEW_19_tue">19.00</div>
    <div class="grid-item" id="TT_NEW_19_wed">19.00</div>
    <div class="grid-item" id="TT_NEW_19_thu">19.00</div>
    <div class="grid-item" id="TT_NEW_19_fri">19.00</div>
    <div class="grid-item" id="TT_NEW_19_sat">19.00</div>
    <div class="grid-item" id="TT_NEW_19_sun">19.00</div>
    <div class="grid-item" id="TT_NEW_20_mon">20.00</div>
    <div class="grid-item" id="TT_NEW_20_tue">20.00</div>
    <div class="grid-item" id="TT_NEW_20_wed">20.00</div>
    <div class="grid-item" id="TT_NEW_20_thu">20.00</div>
    <div class="grid-item" id="TT_NEW_20_fri">20.00</div>
    <div class="grid-item" id="TT_NEW_20_sat">20.00</div>
    <div class="grid-item" id="TT_NEW_20_sun">20.00</div>
    <div class="grid-item" id="TT_NEW_21_mon">21.00</div>
    <div class="grid-item" id="TT_NEW_21_tue">21.00</div>
    <div class="grid-item" id="TT_NEW_21_wed">21.00</div>
    <div class="grid-item" id="TT_NEW_21_thu">21.00</div>
    <div class="grid-item" id="TT_NEW_21_fri">21.00</div>
    <div class="grid-item" id="TT_NEW_21_sat">21.00</div>
    <div class="grid-item" id="TT_NEW_21_sun">21.00</div>
    <div class="grid-item" id="TT_NEW_22_mon">22.00</div>
    <div class="grid-item" id="TT_NEW_22_tue">22.00</div>
    <div class="grid-item" id="TT_NEW_22_wed">22.00</div>
    <div class="grid-item" id="TT_NEW_22_thu">22.00</div>
    <div class="grid-item" id="TT_NEW_22_fri">22.00</div>
    <div class="grid-item" id="TT_NEW_22_sat">22.00</div>
    <div class="grid-item" id="TT_NEW_22_sun">22.00</div>
    <div class="grid-item" id="TT_NEW_23_mon">23.00</div>
    <div class="grid-item" id="TT_NEW_23_tue">23.00</div>
    <div class="grid-item" id="TT_NEW_23_wed">23.00</div>
    <div class="grid-item" id="TT_NEW_23_thu">23.00</div>
    <div class="grid-item" id="TT_NEW_23_fri">23.00</div>
    <div class="grid-item" id="TT_NEW_23_sat">23.00</div>
    <div class="grid-item" id="TT_NEW_23_sun">23.00</div>
    <div class="grid-item" id="TT_NEW_24_mon" style="background-color: #000;">24.00</div>
    <div class="grid-item" id="TT_NEW_24_tue" style="background-color: #000;">24.00</div>
    <div class="grid-item" id="TT_NEW_24_wed" style="background-color: #000;">24.00</div>
    <div class="grid-item" id="TT_NEW_24_thu" style="background-color: #000;">24.00</div>
    <div class="grid-item" id="TT_NEW_24_fri">24.00</div>
    <div class="grid-item" id="TT_NEW_24_sat">24.00</div>
    <div class="grid-item" id="TT_NEW_24_sun" style="background-color: #000;">24.00</div>
    </div>
  </div>
  </div>
  </div>
  <div class="row">
  <div class="column"></div>
  <div class="column">
  <div>
    <h2 style="padding-left: 10px;">Bord 2</h2>
    <div class="grid-container">
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">M&aringndag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">Tisdag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">Onsdag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">Torsdag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">Fredag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">L&oumlrdag</div>
    <div class="grid-item" style="border-style: none; padding-bottom: 25px;">S&oumlndag</div>
    <div class="grid-item" id="TTN_OLD_mon" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_OLD_tue" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_OLD_wed" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_OLD_thu" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_OLD_fri" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_OLD_sat" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TTN_OLD_sun" style="border-style: none; padding-bottom: 25px;"></div>
    <div class="grid-item" id="TT_OLD_13_mon" style="background-color: #000;">13.00</div>
    <div class="grid-item" id="TT_OLD_13_tue" style="background-color: #000;">13.00</div>
    <div class="grid-item" id="TT_OLD_13_wed" style="background-color: #000;">13.00</div>
    <div class="grid-item" id="TT_OLD_13_thu" style="background-color: #000;">13.00</div>
    <div class="grid-item" id="TT_OLD_13_fri">13.00</div>
    <div class="grid-item" id="TT_OLD_13_sat">13.00</div>
    <div class="grid-item" id="TT_OLD_13_sun" style="background-color: #000;">13.00</div>
    <div class="grid-item" id="TT_OLD_14_mon" style="background-color: #000;">14.00</div>
    <div class="grid-item" id="TT_OLD_14_tue" style="background-color: #000;">14.00</div>
    <div class="grid-item" id="TT_OLD_14_wed" style="background-color: #000;">14.00</div>
    <div class="grid-item" id="TT_OLD_14_thu" style="background-color: #000;">14.00</div>
    <div class="grid-item" id="TT_OLD_14_fri">14.00</div>
    <div class="grid-item" id="TT_OLD_14_sat">14.00</div>
    <div class="grid-item" id="TT_OLD_14_sun" style="background-color: #000;">14.00</div>
    <div class="grid-item" id="TT_OLD_15_mon">15.00</div>
    <div class="grid-item" id="TT_OLD_15_tue">15.00</div>
    <div class="grid-item" id="TT_OLD_15_wed">15.00</div>
    <div class="grid-item" id="TT_OLD_15_thu">15.00</div>
    <div class="grid-item" id="TT_OLD_15_fri">15.00</div>
    <div class="grid-item" id="TT_OLD_15_sat">15.00</div>
    <div class="grid-item" id="TT_OLD_15_sun">15.00</div>
    <div class="grid-item" id="TT_OLD_16_mon">16.00</div>
    <div class="grid-item" id="TT_OLD_16_tue">16.00</div>
    <div class="grid-item" id="TT_OLD_16_wed">16.00</div>
    <div class="grid-item" id="TT_OLD_16_thu">16.00</div>
    <div class="grid-item" id="TT_OLD_16_fri">16.00</div>
    <div class="grid-item" id="TT_OLD_16_sat">16.00</div>
    <div class="grid-item" id="TT_OLD_16_sun">16.00</div>
    <div class="grid-item" id="TT_OLD_17_mon">17.00</div>
    <div class="grid-item" id="TT_OLD_17_tue">17.00</div>
    <div class="grid-item" id="TT_OLD_17_wed">17.00</div>
    <div class="grid-item" id="TT_OLD_17_thu">17.00</div>
    <div class="grid-item" id="TT_OLD_17_fri">17.00</div>
    <div class="grid-item" id="TT_OLD_17_sat">17.00</div>
    <div class="grid-item" id="TT_OLD_17_sun">17.00</div>
    <div class="grid-item" id="TT_OLD_18_mon">18.00</div>
    <div class="grid-item" id="TT_OLD_18_tue">18.00</div>
    <div class="grid-item" id="TT_OLD_18_wed">18.00</div>
    <div class="grid-item" id="TT_OLD_18_thu">18.00</div>
    <div class="grid-item" id="TT_OLD_18_fri">18.00</div>
    <div class="grid-item" id="TT_OLD_18_sat">18.00</div>
    <div class="grid-item" id="TT_OLD_18_sun">18.00</div>
    <div class="grid-item" id="TT_OLD_19_mon">19.00</div>
    <div class="grid-item" id="TT_OLD_19_tue">19.00</div>
    <div class="grid-item" id="TT_OLD_19_wed">19.00</div>
    <div class="grid-item" id="TT_OLD_19_thu">19.00</div>
    <div class="grid-item" id="TT_OLD_19_fri">19.00</div>
    <div class="grid-item" id="TT_OLD_19_sat">19.00</div>
    <div class="grid-item" id="TT_OLD_19_sun">19.00</div>
    <div class="grid-item" id="TT_OLD_20_mon">20.00</div>
    <div class="grid-item" id="TT_OLD_20_tue">20.00</div>
    <div class="grid-item" id="TT_OLD_20_wed">20.00</div>
    <div class="grid-item" id="TT_OLD_20_thu">20.00</div>
    <div class="grid-item" id="TT_OLD_20_fri">20.00</div>
    <div class="grid-item" id="TT_OLD_20_sat">20.00</div>
    <div class="grid-item" id="TT_OLD_20_sun">20.00</div>
    <div class="grid-item" id="TT_OLD_21_mon">21.00</div>
    <div class="grid-item" id="TT_OLD_21_tue">21.00</div>
    <div class="grid-item" id="TT_OLD_21_wed">21.00</div>
    <div class="grid-item" id="TT_OLD_21_thu">21.00</div>
    <div class="grid-item" id="TT_OLD_21_fri">21.00</div>
    <div class="grid-item" id="TT_OLD_21_sat">21.00</div>
    <div class="grid-item" id="TT_OLD_21_sun">21.00</div>
    <div class="grid-item" id="TT_OLD_22_mon">22.00</div>
    <div class="grid-item" id="TT_OLD_22_tue">22.00</div>
    <div class="grid-item" id="TT_OLD_22_wed">22.00</div>
    <div class="grid-item" id="TT_OLD_22_thu">22.00</div>
    <div class="grid-item" id="TT_OLD_22_fri">22.00</div>
    <div class="grid-item" id="TT_OLD_22_sat">22.00</div>
    <div class="grid-item" id="TT_OLD_22_sun">22.00</div>
    <div class="grid-item" id="TT_OLD_23_mon">23.00</div>
    <div class="grid-item" id="TT_OLD_23_tue">23.00</div>
    <div class="grid-item" id="TT_OLD_23_wed">23.00</div>
    <div class="grid-item" id="TT_OLD_23_thu">23.00</div>
    <div class="grid-item" id="TT_OLD_23_fri">23.00</div>
    <div class="grid-item" id="TT_OLD_23_sat">23.00</div>
    <div class="grid-item" id="TT_OLD_23_sun">23.00</div>
    <div class="grid-item" id="TT_OLD_24_mon" style="background-color: #000;">24.00</div>
    <div class="grid-item" id="TT_OLD_24_tue" style="background-color: #000;">24.00</div>
    <div class="grid-item" id="TT_OLD_24_wed" style="background-color: #000;">24.00</div>
    <div class="grid-item" id="TT_OLD_24_thu" style="background-color: #000;">24.00</div>
    <div class="grid-item" id="TT_OLD_24_fri">24.00</div>
    <div class="grid-item" id="TT_OLD_24_sat">24.00</div>
    <div class="grid-item" id="TT_OLD_24_sun" style="background-color: #000;">24.00</div>
    </div>
  </div>
  </div>
  </div>
  </div>
</body>
</html>
