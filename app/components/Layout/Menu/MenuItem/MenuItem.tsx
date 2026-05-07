import { BiSolidDashboard } from "react-icons/bi";
import { SiCivicrm } from "react-icons/si";
import { FaMoneyBill } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import { BsFillBoxFill } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";

interface MenuItem {
    id: string;
    label: string;
    submenu?: Array<{ id: string; label: string }>;
}

const menuItemsAdmin: MenuItem[] = [
    {
        id: "dashboard",
        label: "DASHBOARDS",
        submenu: [
            { id: "dash-vendas", label: "Vendas" },
            { id: "dash-faturamento", label: "Faturamento" },
            { id: "dash-comissoes", label: "Comissões" },
        ]
    },
    {
        id: "crm",
        label: "CRM",
    },
    {
        id: "vendas",
        label: "VENDAS e NF-e",
        submenu: [
            { id: "pedido-venda", label: "Pedido de venda" },
            { id: "notas-fiscais", label: "Notas Fiscais" }
        ]
    },
    {
        id: "servicos",
        label: "SERVIÇOS e NFS-e",
    },
    {
        id: "compras",
        label: "COMPRAS",
    },
    {
        id: "orcamento",
        label: "ORÇAMENTO",
        submenu: [
            { id: "produtos", label: "Catálogo de produtos" },
        ]
    },
];
const menuItemsUser: MenuItem[] = [
    {
        id: "dashboard",
        label: "DASHBOARDS",
        submenu: [
            { id: "dash-vendas", label: "Vendas" },
            { id: "dash-faturamento", label: "Faturamento" },
        ]
    },
    {
        id: "orcamento",
        label: "ORÇAMENTO",
        submenu: [
            { id: "produtos", label: "Catálogo de produtos" },
        ]
    },
];
const menuItemsVendedor: MenuItem[] = [
    {
        id: "dashboard",
        label: "DASHBOARDS",
        submenu: [
            { id: "dash-vendas", label: "Vendas" },
        ]
    },
    {
        id: "vendas",
        label: "VENDAS e NF-e",
        submenu: [
            { id: "pedido-venda", label: "Pedido de venda" },
            { id: "notas-fiscais", label: "Notas Fiscais" }
        ]
    },
    {
        id: "orcamento",
        label: "ORÇAMENTO",
        submenu: [
            { id: "produtos", label: "Catálogo de produtos" },
        ]
    },
];

const menuItems = {
    'admin': menuItemsAdmin,
    'user': menuItemsUser,
    'vendedor': menuItemsVendedor
}

export default menuItems;
