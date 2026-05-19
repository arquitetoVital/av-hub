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
import Card from "@/components/Card/Card";
import pedidos from "./pedidos_3.json";
import { Autocomplete, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Modal from '@/components/Modal/Modal';
import { LineChart } from '@mui/x-charts';
import { dataset, valueFormatter } from './product';

type Produto = {
  id: string;
  data: string;
  fornecedor: string;
  descricao: string;
  un: string;
  valorMedio: number;
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
  const [isOpen, setIsOpen] = useState(false);
  const [rowData, setRowData] = useState<Produto>();

  const [familiaProdutosSelected, setFamiliaProdutosSelected] = useState('');
  const [familiaProdutos, setFamiliaProdutos] = useState<{ familia: string }[]>([]);

  const [fornecedorSelected, setFornecedorSelected] = useState<string | null>(null);
  const [fornecedor, setFornecedor] = useState<string[]>([]);
  const [inputFornecedor, setInputFornecedor] = useState<string>('');

  //Preparação do Array de produtos geral e familia de produtos
  useEffect(() => {
    setLoading(true);
    let productfamilies: { familia: string }[] = [];
    let fornecedores: { fornecedor: string }[] = [];
    const parsed: Produto[] = pedidos.flatMap((pedido) =>
      pedido.produtos.map((produto) => {
        productfamilies.push({
          familia: produto.descricao_familia
        });
        fornecedores.push({
          fornecedor: pedido.fornecedor.nome_fantasia
        });
        return ({
          id: produto.cProduto,
          data: pedido.dIncData,
          fornecedor: pedido.fornecedor.nome_fantasia,
          descricao: produto.cDescricao,
          un: produto.cUnidade,
          valorMedio: 0,
          valorMercadoria: produto.nValUnit,
          estado: pedido.fornecedor.estado,
          familia: produto.descricao_familia
        })
      })
    );
    const cleanedFamilia = Array.from(
      new Map(
        productfamilies.map(item => [item.familia, item])
      ).values().filter(x => x.familia.trim().length > 0)
    );
    const cleanedFornecedor = Array.from(
      new Map(
        fornecedores.map(item => [item.fornecedor, item.fornecedor])
      ).values().filter(x => x.trim().length > 0)
    );
    setFamiliaProdutos(cleanedFamilia);
    setFornecedor(cleanedFornecedor);
    setRows(parsed);
    setLoading(false);
  }, []);

  //Filtragem de resultados através de descrição E/OU familia de produtos E/OU fornecedor
  const filteredRows = useMemo(() => {
    const term = search.toLowerCase();
    return rows.filter((row) => {
      const matchDescricao = row.descricao.toLowerCase().includes(term);
      const matchFamilia = !familiaProdutosSelected || row.familia === familiaProdutosSelected;
      const matchFornecedor = !fornecedorSelected || row.fornecedor === fornecedorSelected;
      return matchDescricao && matchFamilia && matchFornecedor;
    });
  }, [search, rows, familiaProdutosSelected, fornecedorSelected]);

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

  const limparCampos = () => {
    setSearch('');
    setFamiliaProdutosSelected('');
    setFornecedorSelected(null);
    setInputFornecedor('');
  }

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
            <TextField sx={{ flex: 1, minWidth: 300 }}
              id="outlined-basic"
              label="Descrição"
              variant="outlined"
              value={search} onChange={(e) => {
                setSearch(e.target.value);
                setPage(0); // reset pagina
              }} />
            <FormControl sx={{ flex: 1, minWidth: 300 }}>
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
            <Autocomplete
              sx={{ flex: 1, minWidth: 300 }}
              disablePortal
              options={fornecedor}
              getOptionLabel={(fornecedor) => fornecedor}
              value={fornecedorSelected}
              inputValue={inputFornecedor}
              renderInput={(params) => <TextField {...params} label="Fornecedores" />}
              onChange={(_, newValue) => { setFornecedorSelected(newValue) }}
              onInputChange={(_, newInputValue) => { setInputFornecedor(newInputValue) }}
            />
          </div>
          <div className={styles.cardButtons}>
            <button onClick={limparCampos} className={styles.buttonExport}>
              Limpar Campos
            </button>
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
            <TableContainer sx={{ maxHeight: 380, overflowX: 'auto' }}>
              <Table stickyHeader size="small">
                <TableHead>
                  <TableRow>
                    {["Data", "Descrição do produto", "Cod. produto", "Família do produto", "Unidade", "Fornecedor", "Estado", "Valor médio", "Ultimo valor",].map((label) => (
                      <TableCell key={label} >{label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedRows.map((row, index) => (
                    <TableRow hover key={index} onClick={() => {
                      setRowData(row)
                      setIsOpen(true)
                    }}>
                      <TableCell>{row.data}</TableCell>
                      <TableCell >{row.descricao}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.familia}</TableCell>
                      <TableCell>{row.un}</TableCell>
                      <TableCell>{row.fornecedor}</TableCell>
                      <TableCell>{row.estado}</TableCell>
                      <TableCell>{row.valorMedio}</TableCell>
                      <TableCell>
                        {row.valorMercadoria.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
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
            labelRowsPerPage={'Resultados por página'}
            labelDisplayedRows={({ from, to, count, page }) => { return `${from}-${to} de ${count}` }}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
          />
        </Card>
      </div>
      <Modal
        title='Detalhes do fornecedor'
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {rowData && (
          <div style={{
            width: '100%',
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div>
              <p>Nome: {rowData && rowData.fornecedor}</p>
              <p>Estado: {rowData && rowData.estado}</p>
            </div>
            <hr />
            <div>
              <LineChart
                sx={{ paddingRight: '1rem' }}
                height={250}
                dataset={dataset}
                series={[
                  {
                    dataKey: 'valor',
                    label: `${rowData.descricao}`,
                    curve: 'natural',
                    valueFormatter: valueFormatter,
                    showMark: true
                  },
                ]}
                xAxis={[{ scaleType: 'point', dataKey: 'month' }]}
                yAxis={[{ valueFormatter: valueFormatter, }]}
                grid={{ vertical: true, horizontal: true }}
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}