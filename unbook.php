<?php
// database connection code
if(isset($_POST['txtPhone']))
{
    $con = mysqli_connect('localhost', 'id21042321_admin', 'nNASGE!yM!dH9hj5','id21042321_booking');

    // get the post records
    $txtPhone = $_POST['txtPhone'];

    // database insert SQL code
    $sql = "DELETE * FROM `Booked` WHERE `Booked`.`fldPhone` = $txtPhone";

    // insert in database 
    $rs = mysqli_query($con, $sql);
    if($rs)
    {
    	//echo "Booking Records Removed";
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
<title>Avboka ett Bord</title>
<link href="style.css" rel="stylesheet">
<script type="text/javascript" src="main2.js"></script>
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
      <h2>Avboka Bord - Snooker</h2>
    </div>
  <fieldset>
    <form id="myForm" name="frmBook" class="needs-validation " method="post" action="unbook.php">
      <p>
        <label for="phone">Telnr</label>
        <input type="text"  class="form-control" name="txtPhone" id="txtPhone" placeholder="0701234567" value="" required>
      </p>
      <p>&nbsp;</p>
      <p>
        <input type="submit" name="button" id="smt-button" value="Avboka Bord"  class="btn btn-primary btn-lg btn-block">
      </p>
    </form>
  </fieldset>
  <input type="button" name="button" id="smt-button" value="Tillbacka"  class="btn btn-primary btn-lg btn-block" onclick="window.location.href = 'index.php'">

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