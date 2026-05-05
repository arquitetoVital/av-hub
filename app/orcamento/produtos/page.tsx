'use client';

import { useMemo, useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as XLSX from "xlsx";
import { FaFileDownload } from 'react-icons/fa';
import styles from "./styles.module.css";
import Card from "@/app/components/Layout/Card/Card";
import pedidos from "./pedidos.json";
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

type Produto = {
  id: string;
  data: string;
  fornecedor: string;
  descricao: string;
  un: string;
  valorMercadoria: number;
  estado: string;
  familia: string;
};

export default function Cadastro() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<Produto[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [familiaProdutosSelected, setFamiliaProdutosSelected] = useState('');
  const [familiaProdutos, setFamiliaProdutos] = useState<{ familia: string }[]>([]);

  //Preparação do Array de produtos geral e familia de produtos
  useEffect(() => {
    setLoading(true);
    let productfamilies: { familia: string }[] = [];
    const parsed: Produto[] = pedidos.flatMap((pedido) =>
      pedido.produtos.map((produto) => {
        productfamilies.push({
          familia: produto.descricao_familia
        });
        return ({
          id: produto.cProduto,
          data: pedido.dIncData,
          fornecedor: pedido.fornecedor.nome_fantasia,
          descricao: produto.cDescricao,
          un: produto.cUnidade,
          valorMercadoria: produto.nValUnit,
          estado: pedido.fornecedor.estado,
          familia: produto.descricao_familia
        })
      })
    );
    const cleaned = Array.from(
      new Map(
        productfamilies.map(item => [item.familia, item])
      ).values().filter(x => x.familia.trim().length > 0)
    );
    setFamiliaProdutos(cleaned);
    setRows(parsed);
    setLoading(false);
  }, []);

  //Filtragem de resultados através de descrição E/OU familia de produtos
  const filteredRows = useMemo(() => {
    const term = search.toLowerCase();

    return rows.filter((row) => {
      const matchDescricao = row.descricao.toLowerCase().includes(term);

      const matchFamilia = !familiaProdutosSelected || row.familia === familiaProdutosSelected;

      return matchDescricao && matchFamilia;
    });
  }, [search, rows, familiaProdutosSelected]);

  const paginatedRows = useMemo(() => {
    return filteredRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredRows, page, rowsPerPage]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Dados");
    XLSX.writeFile(wb, "exportacao_portal.xlsx");
  };

  return (
    <>
      <div>
        <h2 className={styles.title}>Catálogo de produtos</h2>
        <h3 className={styles.subtitle}>
          Consulte os últimos valores praticados pelos produtos
        </h3>
      </div>

      <div className={styles.content}>
        <Card>
          <h2 className={styles.cardTitle}>Consulta de Produtos</h2>

          <div className={styles.inputContainers}>
            <TextField
              sx={{ minWidth: 500 }}
              id="outlined-basic"
              label="Descrição"
              variant="outlined"
              value={search} onChange={(e) => {
                setSearch(e.target.value);
                setPage(0); // reset pagina
              }} />
            <FormControl sx={{ minWidth: 350 }}>
              <InputLabel id="familia-produto">Família de Produtos</InputLabel>
              <Select
                labelId="familia-produto"
                id="demo-simple-select"
                value={familiaProdutosSelected}
                label="FamiliaProdutos"
                onChange={(e) => setFamiliaProdutosSelected(e.target.value)}
              >

                <MenuItem value=""> </MenuItem>
                {familiaProdutos.map((familia, index) => (
                  <MenuItem key={index} value={familia.familia}>
                    {familia.familia}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Card>

        <Card>
          <div className={styles.cardHeaderActions}>
            <h2 className={styles.cardTitle}>Produtos Encontrados</h2>
            <button onClick={exportToExcel} className={styles.buttonExport}>
              <FaFileDownload size={18} /> Exportar
            </button>
          </div>
          {loading ? (
            <div className={styles.loading}>Carregando...</div>
          ) : (
            <TableContainer sx={{ maxHeight: 380 }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    {["Cod.", "Data", "Fornecedor", "Descrição", "Unidade", "Valor", "Estado", "Família"].map((label) => (
                      <TableCell key={label}>{label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedRows.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.data}</TableCell>
                      <TableCell>{row.fornecedor}</TableCell>
                      <TableCell>{row.descricao}</TableCell>
                      <TableCell>{row.un}</TableCell>
                      <TableCell>
                        {row.valorMercadoria.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                      <TableCell>{row.estado}</TableCell>
                      <TableCell>{row.familia}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </Card>
      </div>
    </>
  );
}