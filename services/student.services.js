const StudentModel = require('../models/student.model')

const highereducationdataPromise = (studentsData, uniqueYears) => {
  return new Promise((resolve, reject) => {
    let higherEducationData = []
    uniqueYears.forEach((year, index) => {
      const students = studentsData.filter(student => student.passingyear === year)
      const higherEducationStudents = students.filter(student => student.ishighereducationopted === 'yes').length
      higherEducationData.push({
        "name" : year,
        "value" : higherEducationStudents
      })
      if(index === uniqueYears.length - 1) {
        resolve(higherEducationData)
      }
    })
  })
}

const yearWisePlacementDataPromise = (studentsData, uniqueYears) => {
  return new Promise((resolve, reject) => {
    let yearWisePlacementData = []
    uniqueYears.forEach((year, index) => {
      const students = studentsData.filter(student => student.passingyear === year)
      const placementStudents = students.filter(student => student.companyname !== 'not placed').length
      yearWisePlacementData.push({
        "name" : year,
        "value" : placementStudents
      })
      if(index === uniqueYears.length - 1) {
        resolve(yearWisePlacementData)
      }
    })
  })
}


class StudentService {

  async findStudent(filter) {
    try {
      const student = await StudentModel.findOne(filter)
      return student
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async getPlacementData(filter, role) {
    try {
      const students = await StudentModel.find(filter)
      console.log(students)
      const totalStudents = students.length
      const placedStudents = students.filter(student => student.companyname !== 'not placed').length
      // const higherEducationStudents = students.filter(student => student.education === 'higher').length
      console.log(totalStudents, placedStudents)
      return [
        {
          "name" :  `Unplaced Students ${role === 'institution' ? 'of your institution' : 'of all institutions'}`,
          "value" : totalStudents - placedStudents
        },
        {
          "name" :  `Placed Students ${role === 'institution' ? 'of your institution' : 'of all institutions'}`,
          "value" : placedStudents
        }
      ]
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async createStudent(student) {
    try {
      const newStudent = await StudentModel.create(student)
      return newStudent
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async findStudentWithPopulate(filter) {
    try {
      const student = await StudentModel.findOne(filter).populate('institution')
      return student
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async updateStudent(filter, student) {
    try {
      const updatedStudent = await StudentModel.findOneAndUpdate(filter, student, { new: true })
      return updatedStudent
    } catch (err) {
      console.log(err)
      return err
    }
  }

  async getHigherEducationData(filter) {
    try {
      const students = await StudentModel.find(filter)
      const years = students.map(student => student.passingyear)
      const uniqueYears = [...new Set(years)]
      uniqueYears.sort((a, b) => a - b)

      const higherEducationData = await highereducationdataPromise(students, uniqueYears)
      console.log(higherEducationData)
      
      return higherEducationData
    } catch(err) {
      console.log(err)
      return err
    }
  }

  async getAllStudents(filter, role) {
    try {
      const students = await StudentModel.find(filter).populate('institution')
      return students
    } catch(err) {
      console.log(err)
      return err
    }
  }

  async getYearWisePlacementData(filter) {
    try {
      const students = await StudentModel.find(filter)
      const years = students.map(student => student.passingyear)
      const uniqueYears = [...new Set(years)]
      uniqueYears.sort((a, b) => a - b)

      const yearWisePlacementData = await yearWisePlacementDataPromise(students, uniqueYears)
      console.log(yearWisePlacementData)
      return yearWisePlacementData
    } catch(err) {
    console.log(err)
    return err
    }}

    async getStudentCount(filter) {
      try {
        const students = await StudentModel.find(filter)
        const placedStudents = students.filter(student => student.companyname !== 'not placed').length
        const unplacedStudents = students.filter(student => student.companyname === 'not placed').length
        const higherEducationStudents = students.filter(student => student.ishighereducationopted === 'yes').length
        return [
          {
            "name" : "Placed Students",
            "value" : placedStudents
          },
          {
            "name" : "Unplaced Students",
            "value" : unplacedStudents
          },
          {
            "name" : "Higher Education Students",
            "value" : higherEducationStudents
          }
        ]
      } catch(err) {
        console.log(err)
        return err
      }
    }

    async getAllSkills(filter) {
      try {
        const students = await StudentModel.find(filter)
        const skills = students.reduce((acc, student) => {
          student.skills.forEach(skill => {
            if(!acc.includes(skill)) {
              acc.push(skill)
            }
          } )
          return acc
        } , [])
        
        return skills
      } catch(err) {
        console.log(err)
        return err
      }
    }
}

module.exports = new StudentService()