<?php
  require_once("creds.php");

  function createPDO() {
    $host = '127.0.0.1';
    $db   = 'wad';
    $charset = 'utf8mb4';
  
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $opt = [
      PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    return new PDO($dsn, get_username(), get_password(), $opt);
  }

  $pdo = createPDO();