<?php
$con = mysqli_connect('localhost', 'id21042321_admin', 'nNASGE!yM!dH9hj5','id21042321_booking');
$result = mysqli_query($con,"SELECT * FROM `Booked`");
$data = $result->fetch_all(MYSQLI_ASSOC);
?>

<head>
    <link rel="icon" href="img/icon.png">
    <title>Admin Panel</title>
    <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-TMPN0CGN95"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-TMPN0CGN95');
  </script>
</head>
<body>
  <script>
    var DATE = <?= htmlspecialchars($row['fldDate']) ?>;
  </script>
<table border="1">
  <tr>
    <th>id</th>
    <th>Namn</th>
    <th>Telefon</th>
    <th>Bok Datum</th>
    <th>Dag</th>
    <th>Tid</th>
    <th>Bord</th>
  </tr>
  <?php foreach($data as $row): ?>
  <script>
    var DATE = <?= htmlspecialchars($row['fldDate']) ?>;
    console.log(DATE);
  </script>
  <tr>
    <td><?= htmlspecialchars($row['id']) ?></td>
    <td><?= htmlspecialchars($row['fldName']) ?></td>
    <td><?= htmlspecialchars($row['fldPhone']) ?></td>
    <td><?= htmlspecialchars($row['bkDate']) ?></td>
    <td><?= htmlspecialchars($row['fldDate']) ?></td>
    <td><?= htmlspecialchars($row['fldTime']) ?></td>
    <td><?= htmlspecialchars($row['fldTable']) ?></td>
  </tr>
  <?php endforeach ?>
</table>
<br>
<br>
<input type="button" name="button" id="smt-button" value="RENSA DATA💀"  class="btn btn-primary btn-lg btn-block" style="background-color: red;" onclick="">
<body>
