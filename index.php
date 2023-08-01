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
  $bkDate = $_POST['bkDate'];


  for ($i = 0; $i < $txtLength; $i++) {
    $con = mysqli_connect('localhost', 'id21042321_admin', 'nNASGE!yM!dH9hj5','id21042321_booking');
    
    // database insert SQL code
    $sql = "INSERT INTO `Booked` VALUES ('0', '$txtName', '$txtPhone', '$txtDate', '$bkDate' ,'$txtTime', '$txtTable')";

    // insert in database 
    $rs = mysqli_query($con, $sql);
    if($rs)
    {
    	//echo "Booking Records Inserted";
      $txtTime = $txtTime + 1;
    }
    //Delete Old Data
    /*$sql = "DELETE FROM `Booked` WHERE `Booked`.bkDate = ";

    // insert in database 
    $rs = mysqli_query($con, $sql);
    if($rs)
    {
    	echo "Booking Records Removed";
    }*/
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
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/Tech-Magnet/VideoBiljardenBooking@Rethink/main.js"></script>
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
        <input type="text"  class="form-control" name="txtPhone" id="txtPhone" placeholder="" value="" required>
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
          <!--<option id="DATE-NEXT-MON" value="8">M&aringndag</option>
          <option id="DATE-NEXT-TUE" value="9">Tisdag</option>
          <option id="DATE-NEXT-WED" value="10">Onsdag</option>
          <option id="DATE-NEXT-THU" value="11">Torsdag</option>
          <option id="DATE-NEXT-FRI" value="12">Fredag</option>
          <option id="DATE-NEXT-SAT" value="13">L&oumlrdag</option>
          <option id="DATE-NEXT-SUN" value="7">S&oumlndag</option>-->
        </select>
      </p>
      <p>
        <label for="time">Tid</label>
        <select id="txtTime" name="txtTime" style="padding: 10px;">
          <option id="txtTime_13" value="13">13.00</option>
          <option id="txtTime_14" value="14">14.00</option>
          <option id="txtTime_15" value="15">15.00</option>
          <option id="txtTime_16" value="16">16.00</option>
          <option id="txtTime_17" value="17">17.00</option>
          <option id="txtTime_18" value="18">18.00</option>
          <option id="txtTime_19" value="19">19.00</option>
          <option id="txtTime_20" value="20">20.00</option>
          <option id="txtTime_21" value="21">21.00</option>
          <option id="txtTime_22" value="22">22.00</option>
          <option id="txtTime_23" value="23">23.00</option>
          <option id="txtTime_24" value="24">24.00</option>
        </select>
      </p>
      <p>
        <label for="Length">L&aumlngd</label>
        <select id="txtLength" name="txtLength" style="padding: 10px;">
          <option value="1">1 Timme</option>
          <option value="2">2 Timmar</option>
          <option value="3">3 Timmar</option>
          <option value="4">4 Timmar</option>
          <option value="5">5 Timmar</option>
          <option value="6">6 Timmar</option>
          <option value="7">7 Timmar</option>
        </select>
      </p>
      <p>
        <label for="txtTable">Bord</label>
        <select id="txtTable" name="txtTable" style="padding: 10px;">
          <option value="Bord_1">Bord 1</option>
          <option value="Bord_2">Bord 2</option>
        </select>
      </p>
      <p style="display: none;">
        <input style="display: none;" id="bkDate" name="bkDate" value="2023-08-19">
      </p>
      <p>&nbsp;</p>
      <p>
        <input type="button" name="button" id="smt-button" value="Boka Bord"  class="btn btn-primary btn-lg btn-block" onclick="CheckSubmit()">
      </p>
    </form>
  </fieldset>
  <input type="button" name="button" id="smt-button" value="Avboka Bord"  class="btn btn-primary btn-lg btn-block" onclick="window.location.href='unbook.php'">

  </div>
  <div style="display: none;">
    <h3>Aktiva Bokingar</h3>
    <table border="1" id="dbTable">
    <tr>
      <th>Datum Index</th>
      <th>Tid</th>
      <th>Bord</th>
      <th>Datum</th>
    </tr>
    <?php foreach($data as $row): ?>
    <tr>
      <td><?= htmlspecialchars($row['fldDate']) ?></td>
      <td><?= htmlspecialchars($row['fldTime']) ?></td>
      <td><?= htmlspecialchars($row['fldTable']) ?></td>
      <td><?= htmlspecialchars($row['bkDate']) ?></td>
    </tr>
    <?php endforeach ?>
    </table>
  </div>
  <div class="row">
    <div class="column" style="padding-left: 20px">
      <h2>&Oumlppettider</h2>
      <h4>M&aringn - Tors: 15 - 24</h4>
      <h4>Fre - L&oumlr: 13 - 01</h4>
      <h4>S&oumln: 15 - 24</h4>
    </div>
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