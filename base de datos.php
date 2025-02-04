<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ciCliente = $_POST['ciCliente'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];
    $salario = $_POST['salario'];
    $estadoCivil = $_POST['estadoCivil'];
    $nombreConyuge = isset($_POST['nombreConyuge']) ? $_POST['nombreConyuge'] : '';
    $salarioConyuge = isset($_POST['salarioConyuge']) ? $_POST['salarioConyuge'] : '';

    require 'vendor/autoload.php'; // Asegúrate de tener PHPExcel instalado

    $archivo = 'clientes.xlsx';

    if (file_exists($archivo)) {
        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($archivo);
    } else {
        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $spreadsheet->getActiveSheet()->setTitle('Clientes');
        $spreadsheet->getActiveSheet()->setCellValue('A1', 'Ci del Cliente');
        $spreadsheet->getActiveSheet()->setCellValue('B1', 'Nombre');
        $spreadsheet->getActiveSheet()->setCellValue('C1', 'Apellido');
        $spreadsheet->getActiveSheet()->setCellValue('D1', 'Email');
        $spreadsheet->getActiveSheet()->setCellValue('E1', 'Teléfono');
        $spreadsheet->getActiveSheet()->setCellValue('F1', 'Salario (en Gs)');
        $spreadsheet->getActiveSheet()->setCellValue('G1', 'Estado Civil');
        $spreadsheet->getActiveSheet()->setCellValue('H1', 'Nombre del Cónyuge');
        $spreadsheet->getActiveSheet()->setCellValue('I1', 'Salario del Cónyuge (en Gs)');
    }

    $sheet = $spreadsheet->getActiveSheet();
    $lastRow = $sheet->getHighestRow();
    $sheet->setCellValue('A' . ($lastRow + 1), $ciCliente);
    $sheet->setCellValue('B' . ($lastRow + 1), $nombre);
    $sheet->setCellValue('C' . ($lastRow + 1), $apellido);
    $sheet->setCellValue('D' . ($lastRow + 1), $email);
    $sheet->setCellValue('E' . ($lastRow + 1), $telefono);
    $sheet->setCellValue('F' . ($lastRow + 1), $salario);
    $sheet->setCellValue('G' . ($lastRow + 1), $estadoCivil);
    $sheet->setCellValue('H' . ($lastRow + 1), $nombreConyuge);
    $sheet->setCellValue('I' . ($lastRow + 1), $salarioConyuge);

    $writer = \PhpOffice\PhpSpreadsheet\IOFactory