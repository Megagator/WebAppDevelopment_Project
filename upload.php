<?php 
  require_once("pdo.php");

  if ( count($_FILES) > 0 ) {
    $db = "wad";
    $table = "cars";
    $sql = 'SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$db,$table]);
    $inc = $stmt->fetch();
    
    // echo $inc['AUTO_INCREMENT'];
    $data = array();
    $i = 0;
    foreach ($_FILES as $file) {
      $newFileName = "images/" . ($inc['AUTO_INCREMENT'] + $i) . '-' . $file['name'];
      
      if ( move_uploaded_file($file['tmp_name'], $newFileName ) ) {
        $descrip = $_POST['file_desc_' . $i];
        
        $sql = 'INSERT INTO cars (filepath, description) VALUES (?,?)';
        $pdo->prepare($sql)->execute([$newFileName, $descrip]);
        
        $data[] = [
          'image_location' => $newFileName,
          'image_description' => $descrip
        ];
        
      } else {
        $i--;
        echo 'error with file';
      }
      
      $i++;
    }
    echo json_encode($data);
    exit;
  } else {
    echo 'No files uploaded';
  }
