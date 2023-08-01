<?php
// database connection code
    $con = mysqli_connect('localhost', 'id21042321_admin', 'nNASGE!yM!dH9hj5','id21042321_booking');
    
    // database insert SQL code
    $sql = "DELETE * FROM `Booked`";

    // insert in database 
    $rs = mysqli_query($con, $sql);
    if($rs)
    {
    	//echo "Booking Records Inserted";
      $txtTime = $txtTime + 1;
    }
    //Delete Old Data
    $sql = "DELETE FROM `Booked` WHERE `Booked`.bkDate = ";

    // insert in database 
    $rs = mysqli_query($con, $sql);
    if($rs)
    {
    	echo "Booking Records Removed";
    }
?>