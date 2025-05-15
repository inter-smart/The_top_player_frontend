import styles from "@/styles/Profile.module.scss";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { useTranslation } from "react-i18next";
import { Column } from "primereact/column";
import { useDispatch } from "react-redux";
import { getPayments } from "@/store/CourcesSlice";
import LangWrap from "@/components/layouts/LangWarp";
const PaymetProgram = ({ Lang }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);
  useEffect(() => {
    if (!products) {
      dispatch(getPayments())
        .unwrap()
        .then((res) => {
          setProducts(res);
        })
        .catch((err) => {});
    }
  }, [products, dispatch]);

  const CouserBody = (rowData) => {
    return (
      <div className="text-center">
        {rowData.courseId === 1 && t("programs_details.fitness.title")}
        {rowData.courseId === 2 && t("programs_details.fitness_fottboll.title")}
        {rowData.courseId === 3 && t("programs_details.football.title")}
      </div>
    );
  };

  const AmountBody = (rowData) => {
    return (
      <div className="text-center">
        {rowData.amount}${/* {rowData.amount / 100}$ */}
      </div>
    );
  };
  return (
    <LangWrap Lang={Lang}>
      <div className={"inner_section_outer"}>
        <div className={styles.payment_section}>
          <div className="container">
            <div
              className={`${styles.profile} ${styles.Tabel}`}
              style={{
                direction: Lang === "ar" ? "rtl" : "ltr",
              }}
            >
              <div className={"tleWrap"}>
                <div className="mTle">{t("payment.title")}</div>
              </div>
              {products && (
                <DataTable
                  value={products}
                  tableStyle={{ minWidth: "50rem", marginTop: "20px" }}
                >
                  <Column field="userId" header={t("payment.userId")}></Column>
                  <Column
                    field="courseId"
                    header={t("payment.courseId")}
                    body={CouserBody}
                  ></Column>
                  <Column
                    field="amount"
                    header={t("payment.amount")}
                    body={AmountBody}
                  ></Column>
                  <Column
                    field="stripeId"
                    header={t("payment.stripeId")}
                  ></Column>
                </DataTable>
              )}
            </div>
          </div>
        </div>
      </div>
    </LangWrap>
  );
};

export default PaymetProgram;
export async function getServerSideProps({ params }) {
  return {
    props: {
      Lang: params.Lang.toLowerCase(),
    },
  };
}
