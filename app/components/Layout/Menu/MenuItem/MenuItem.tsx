import styles from "./style.module.css";
import { BiSolidDashboard } from "react-icons/bi";
import { SiCivicrm } from "react-icons/si";
import { FaMoneyBill } from "react-icons/fa";
import { MdHomeRepairService } from "react-icons/md";
import { BsFillBoxFill } from "react-icons/bs";
import { TbPigMoney } from "react-icons/tb";

interface MenuItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    submenu?: Array<{ id: string; label: string }>;
}

const menuItemsAdmin: MenuItem[] = [
    {
        id: "dashboard",
        label: "DASHBOARDS",
        icon: <BiSolidDashboard className={styles.icons} />,
        submenu: [
            { id: "dash-vendas", label: "Vendas" },
            { id: "dash-faturamento", label: "Faturamento" },
            { id: "dash-comissoes", label: "Comissões" },
        ]
    },
    {
        id: "crm",
        label: "CRM",
        icon: <SiCivicrm className={styles.icons} />
    },
    {
        id: "vendas",
        label: "VENDAS e NF-e",
        icon: <FaMoneyBill className={styles.icons} />,
        submenu: [
            { id: "pedido-venda", label: "Pedido de venda" },
            { id: "notas-fiscais", label: "Notas Fiscais" }
        ]
    },
    {
        id: "servicos",
        label: "SERVIÇOS e NFS-e",
        icon: <MdHomeRepairService className={styles.icons} />
    },
    {
        id: "compras",
        label: "COMPRAS",
        icon: <BsFillBoxFill className={styles.icons} />
    },
    {
        id: "orcamento",
        label: "ORÇAMENTO",
        icon: <TbPigMoney className={styles.icons} />,
        submenu: [
            { id: "produtos", label: "Catálogo de produtos" },
        ]
    },
];
const menuItemsUser: MenuItem[] = [
    {
        id: "dashboard",
        label: "DASHBOARDS",
        icon: <BiSolidDashboard className={styles.icons} />,
        submenu: [
            { id: "dash-vendas", label: "Vendas" },
            { id: "dash-faturamento", label: "Faturamento" },
        ]
    },
    {
        id: "orcamento",
        label: "ORÇAMENTO",
        icon: <TbPigMoney className={styles.icons} />,
        submenu: [
            { id: "produtos", label: "Catálogo de produtos" },
        ]
    },
];
const menuItemsVendedor: MenuItem[] = [
    {
        id: "dashboard",
        label: "DASHBOARDS",
        icon: <BiSolidDashboard className={styles.icons} />,
        submenu: [
            { id: "dash-vendas", label: "Vendas" },
        ]
    },
    {
        id: "vendas",
        label: "VENDAS e NF-e",
        icon: <FaMoneyBill className={styles.icons} />,
        submenu: [
            { id: "pedido-venda", label: "Pedido de venda" },
            { id: "notas-fiscais", label: "Notas Fiscais" }
        ]
    },
    {
        id: "orcamento",
        label: "ORÇAMENTO",
        icon: <TbPigMoney className={styles.icons} />,
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
