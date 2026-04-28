'use client';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as XLSX from "xlsx";

import { CiSearch } from "react-icons/ci";
import styles from "./styles.module.css";
import Card from "@/app/components/Layout/Card/Card";
import React from 'react';
import { FaFileDownload } from 'react-icons/fa';

export type Produto = {
  id: number;
  data: string,
  fornecedor: string,
  descricao: string,
  qnt: number,
  un: string,
  valorMercadoria: number,
  valorTotalCompra: number,
  estado: string,
};

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "data", label: "Data" },
  { id: "fornecedor", label: "Fornecedor" },
  { id: "descricao", label: "Descrição" },
  { id: "qnt", label: "Quantidade", align: 'right' },
  { id: "un", label: "Unidade" },
  {
    id: "valorMercadoria",
    label: "Valor Mercadoria",
    align: 'right',
    format: (info) => info.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
  },
  {
    id: "valorTotalCompra",
    label: "Valor Total da Compra",
    align: 'right',
    format: (info) => info.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
  },
  { id: "estado", label: "Estado" },
];

const rows: Produto[] = [
  { id: 1, data: "10/01/2025", fornecedor: "TECNOPAR FIXADORES E FERRAMENTAS LTDA", descricao: '3/4"x165 - PARAFUSO ESTOJO; AL; A193 GR B7; B18.2.1; C/ PORCAS A194 2H E ARRUELAS  SÉRIE N, AC, GALV.', qnt: 80, un: "PÇ", valorMercadoria: 759.2, valorTotalCompra: 933.42, estado: "SP" },
  { id: 2, data: "14/04/2025", fornecedor: "MERCADO LIVRE", descricao: "2 BOBINA SULFITE A3 297MM X 50M 90GR SFSF", qnt: 2, un: "BOBINA", valorMercadoria: 272, valorTotalCompra: 272, estado: "SP" },
  { id: 3, data: "14/04/2025", fornecedor: "MERCADO LIVRE", descricao: "2 BOBINA SULFITE A3 297MM X 50M 90GR SFSF", qnt: 2, un: "BOBINA", valorMercadoria: 272, valorTotalCompra: 272, estado: "SP" },
  { id: 4, data: "14/04/2025", fornecedor: "MERCADO LIVRE", descricao: "2 BOBINA SULFITE A3 297MM X 50M 90GR SFSF", qnt: 2, un: "BOBINA", valorMercadoria: 272, valorTotalCompra: 272, estado: "SP" },
  { id: 5, data: "14/04/2025", fornecedor: "MERCADO LIVRE", descricao: "2 BOBINA SULFITE A3 297MM X 50M 90GR SFSF", qnt: 2, un: "BOBINA", valorMercadoria: 272, valorTotalCompra: 272, estado: "SP" },
  { id: 6, data: "14/04/2025", fornecedor: "MERCADO LIVRE", descricao: "2 BOBINA SULFITE A3 297MM X 50M 90GR SFSF", qnt: 2, un: "BOBINA", valorMercadoria: 272, valorTotalCompra: 272, estado: "SP" },
  { id: 7, data: "14/04/2025", fornecedor: "MERCADO LIVRE", descricao: "2 BOBINA SULFITE A3 297MM X 50M 90GR SFSF", qnt: 2, un: "BOBINA", valorMercadoria: 272, valorTotalCompra: 272, estado: "SP" },
  { id: 8, data: "14/04/2025", fornecedor: "MERCADO LIVRE", descricao: "2 BOBINA SULFITE A3 297MM X 50M 90GR SFSF", qnt: 2, un: "BOBINA", valorMercadoria: 272, valorTotalCompra: 272, estado: "SP" },
  { id: 9, data: "14/04/2025", fornecedor: "MERCADO LIVRE", descricao: "2 BOBINA SULFITE A3 297MM X 50M 90GR SFSF", qnt: 2, un: "BOBINA", valorMercadoria: 272, valorTotalCompra: 272, estado: "SP" },
  { id: 10, data: "14/04/2025", fornecedor: "MERCADO LIVRE", descricao: "2 BOBINA SULFITE A3 297MM X 50M 90GR SFSF", qnt: 2, un: "BOBINA", valorMercadoria: 272, valorTotalCompra: 272, estado: "SP" },
];

export default function Cadastro() {
  const [search, setSearch] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState<Produto[]>(rows);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = rows.filter((row) =>
      row.descricao.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredRows(filtered);
  }, [search]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dados");
    XLSX.writeFile(wb, "exportacao_portal.xlsx");
  };

  return (
    <>
      <div>
        <h2 className={styles.title}>Catálogo de produtos</h2>
        <h3 className={styles.subtitle}>Consulte os ultimos valores praticados pelos produtos</h3>
      </div>
      <div className={styles.content}>
        <Card>
          <h2 className={styles.cardTitle}>Consulta de Produtos</h2>
          <div className={styles.search}>
            <CiSearch />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="digite o nome do produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Card>
        <Card>
          <div className={styles.cardHeaderActions}>
            <h2 className={styles.cardTitle}>Produtos Encontrados</h2>
            <button onClick={exportToExcel} className={styles.buttonExport}>
              <FaFileDownload size={18} /> Exportar
            </button>
          </div>
          <TableContainer sx={{ maxHeight: 380 }} >
            <Table stickyHeader aria-label="sticky table" size='small' >
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id as keyof Produto];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
    </>
  )
}