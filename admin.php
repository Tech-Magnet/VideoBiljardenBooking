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
<table border="1">
  <tr>
    <th>id</th>
    <th>Namn</th>
    <th>Telefon</th>
    <th>Datum</th>
    <th>Tid</th>
    <th>L&aumlgnd</th>
    <th>Bord</th>
  </tr>
  <?php foreach($data as $row): ?>
  <tr>
    <td><?= htmlspecialchars($row['id']) ?></td>
    <td><?= htmlspecialchars($row['fldName']) ?></td>
    <td><?= htmlspecialchars($row['fldPhone']) ?></td>
    <td><?= htmlspecialchars($row['fldDate']) ?></td>
    <td><?= htmlspecialchars($row['fldTime']) ?></td>
    <td><?= htmlspecialchars($row['fldLength']) ?></td>
    <td><?= htmlspecialchars($row['fldTable']) ?></td>
  </tr>
  <?php endforeach ?>
</table>
<body>
