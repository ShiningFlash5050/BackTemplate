import { Column, Model, Table } from "sequelize-typescript";

@Table
 class Admin extends Model {
    @Column
    name!: string
    @Column
    email!: string
    @Column
    mobile!: string
    @Column
    password!: string
}
export default Admin