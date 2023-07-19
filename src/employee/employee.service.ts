import {HttpException, HttpStatus, Injectable,} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {EmployeeEntity} from '../entities/Employee.entity';
import {UsersEntity} from '../entities/users.entity';
import {Repository} from 'typeorm';
import {CreateEmployeeRes, EmployeeResAllInfo, ListEmployeeResAll} from "../types/employee";
import {RegisterEmployeeRegDto} from "./dto/registerEmployeeReg.dto";
import {hashMethod, hashPwd} from "../utils/hash-password";
import {UpdateEmployeeDto} from "./dto/updateUser.dto";
import {UserRole} from "../types";


@Injectable()
export class EmployeeService {

  filter(employee: UsersEntity ): CreateEmployeeRes{
    const {id, email } = employee;

    return {id, email }
  };

  constructor(
    @InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>,
  ) {};

  async allEmployee(): Promise<ListEmployeeResAll[]>{

    const employee = await EmployeeEntity.find({
      relations: ['user'],
    });

    return employee.map((emp, index) => {
      const employee = {
        id: emp.id,
        email: emp.user.email,
        name: emp.firstName,
        lastname: emp.lastName,
        hourly: emp.hourly,
      };
      return {
        place: index + 1,
        employee: employee,
      };
    });
  }

  async getOne(id: string): Promise<EmployeeResAllInfo> {
    const employee = await EmployeeEntity.findOne({
      where:{
        id: id,
      },
      relations: ['user'],
    });
    return {
      id:employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.user.email,
      hourly: employee.hourly,
    }
  }

  async getEmplyeeWitchUserId(id:string):Promise<string>{
    const employee = await EmployeeEntity.findOne({
      where:{
        user: {
          id: id,
        },
        },
      relations: ['user'],
    });
    return employee.id;
  }

  async createEmployee(userDetails: RegisterEmployeeRegDto): Promise<CreateEmployeeRes> {
    const { email, pwd, role, firstName, lastName, hourly} = userDetails;

    const user = await  this.userRepository.findOneBy({ email });

    if (user)
      throw new HttpException(
        {
          isOk: false,
          message: 'That email existing in the base. Use another email.',
        },
        HttpStatus.BAD_REQUEST,
      );

    const newUser = await  this.userRepository.create({
      email: userDetails.email,
      role: (role == UserRole.Boss)? UserRole.Boss: UserRole.Employee,
      pwd: hashPwd(pwd),
      isActive: true,
      createdAt: new Date(),
    })

    await UsersEntity.save(newUser);

    const newEmployee = await EmployeeEntity.create({
      firstName,
      lastName,
      hourly,
      createdAt: new Date(),
    });
    const savedEmployee = await EmployeeEntity.save(newEmployee);

    savedEmployee.user = newUser;
    EmployeeEntity.save(savedEmployee)

    return this.filter(newUser);
  }

  async updateEmployee(id: string, updateUserDetail: UpdateEmployeeDto) {

    await EmployeeEntity.update(
        { id },
        {
          firstName: updateUserDetail.firstName,
          lastName: updateUserDetail.lastName,
          hourly: updateUserDetail.hourly,
        });

    const updateEmployee =  await EmployeeEntity.findOne({where:{ id }, relations:['user']});

    await this.userRepository.update(
        { id:updateEmployee.user.id },
        {

          email: updateUserDetail.email,
        },
    );

    return updateEmployee;
  }

  async deleteEmployee(id: string) {
    return await EmployeeEntity.delete({ id });
  }
}
