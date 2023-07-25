<?php
// database connection code
if(isset($_POST['txtName']))
{
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');
$con = mysqli_connect('localhost', 'id21042321_admin', 'nNASGE!yM!dH9hj5','id21042321_booking');

// get the post records

$txtName = $_POST['txtName'];
$txtPhone = $_POST['txtPhone'];
$txtDate = $_POST['txtDate'];
$txtTime = $_POST['txtTime'];
$txtTable = $_POST['txtTable'];

// database insert SQL code
$sql = "INSERT INTO `Booked` VALUES ('0', '$txtName', '$txtPhone', '$txtDate', '$txtTime', '$txtTable')";

// insert in database 
$rs = mysqli_query($con, $sql);
if($rs)
{
	echo "Din Bokning har sparats";
	echo "";
	echo "Boknings Bekräftelse:";
	echo "Namn: $txtName";
	echo "Telefon: $txtPhone";
	echo "Datum: $txtDate";
	echo "Tid: $txtTime";
	echo "Bord: $txtTable";
	$sql = "SELECT id `Booked` WHERE fldDate = $txtDate AND fldTime = $txtTime";
	echo "Avboknings ID: $sql"
}
}
else
{
	echo "An ERrOR occured";
}
?>
