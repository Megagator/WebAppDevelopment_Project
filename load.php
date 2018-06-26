<?php 
  require_once("pdo.php");
  $rows = $pdo->query('SELECT * FROM cars');
  $rows->execute();