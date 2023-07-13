import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeEntity } from '../entities/Employee.entity';
import { UsersEntity } from '../entities/users.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeRes, EmployeeResAllInfo, ListEmployeeResAll } from "../types/employee";
import { RegisterEmployeeRegDto } from "./dto/registerEmployeeReg.dto";
import { hashMethod } from "../utils/hash-password";
import {UpdateEmployeeDto} from "./dto/updateUser.dto";


@Injectable()
export class EmployeeService {

  // filter(employee: EmployeeEntity ): CreateEmployeeRes{
  //   const {id, email } = employee;
  //
  //   return {id, email }
  // };

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
      tel: employee.tel,
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

  // async createEmployee(userDetails: RegisterEmployeeRegDto): Promise<CreateEmployeeRes> {
  //   const { email, password } = userDetails;
  //   const user = await EmployeeEntity.findOneBy({ email });
  //
  //   if (user)
  //     throw new HttpException(
  //       {
  //         isOk: false,
  //         message: 'That email existing in the base. Use another email.',
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //
  //   const newUser = await EmployeeEntity.create({
  //     ...userDetails,
  //     password: hashMethod(password),
  //     createdAt: new Date(),
  //   });
  //   const { id } = await EmployeeEntity.save(newUser);
  //
  //   this.createEmployeeProfile(id, userDetails);
  //
  //   return this.filter(newUser);
  // }

  async updateEmployee(id: string, updateUserDetail: UpdateEmployeeDto) {

    await EmployeeEntity.update(
      { id },
      {
        firstName: updateUserDetail.firstName,
        lastName: updateUserDetail.lastName,
        tel: updateUserDetail.tel,
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

  // async createEmployeeProfile(
  //   id: string,
  //   createUserProfileDetails: CreateEmployeeProfileParams,
  // ) {
  //   const user = await EmployeeEntity.findOneBy({ id });
  //   if (!user)
  //     throw new HttpException(
  //       'User not found. Cannot create Profile',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   const newProfile = this.profileRepository.create(createUserProfileDetails);
  //   const savedProfile = await this.profileRepository.save(newProfile);
  //   user.user = savedProfile;
  //
  //   return EmployeeEntity.save(user);
  // }

  //   async updateEmployeeProfile(
  //     id: string,
  //     updateUserProfileDetails: CreateEmployeeProfileDto,
  // ) {
  //     const user = await EmployeeEntity.findOneBy({ id });
  //     if (!user)
  //       throw new HttpException(
  //         'User not found. Cannot create Profile',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //
  //     const updateProfile = await this.userRepository.update({id}, updateUserProfileDetails);
  //     // const savedProfile = await this.profileRepository.save(newProfile);
  //     // user.profile = updateProfile;
  //
  //     return EmployeeEntity.save(user);
  //   }
}
