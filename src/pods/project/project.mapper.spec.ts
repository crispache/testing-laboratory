import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import * as Mappers from './../../common/mappers/collection.mapper';
import { mapProjectFromApiToVm, mapEmployeeSummaryListFromApiToVm, mapEmployeeSummaryFromApiToVm } from './project.mapper';

const mockEmployeesApiModel: apiModel.EmployeeSummary[] = [
  {
    id: '1',
    employeeName: 'Daniel Perez',
    isAssigned: true,
  },
  {
    id: '2',
    employeeName: 'Jose Sanchez',
    isAssigned: false,
  },
];

const mockEmployeesVM: viewModel.EmployeeSummary[] = [
  {
    id: '1',
    employeeName: 'Daniel Perez',
    isAssigned: true,
  },
  {
    id: '2',
    employeeName: 'Jose Sanchez',
    isAssigned: false,
  },
];


describe('Project Mapper specs', () => {
  it('should return Employee view model when call to mapEmployeeSummaryFromApiToVm', () => {
    // Arrange
    // Act
    const result = mapEmployeeSummaryFromApiToVm(mockEmployeesApiModel[0]);

    // Assert
    expect(result).toEqual<viewModel.EmployeeSummary>(mockEmployeesApiModel[0]);
    expect(result.id).toEqual(expect.any(String));
    expect(result.employeeName).toEqual(expect.any(String));
    if(result.hasOwnProperty('isAssigned')) {
      expect([null, undefined, true, false]).toContain(result.isAssigned);
    }
  });

  it('should return empty object when call to mapEmployeeSummaryFromApiToVm with employeeSummary null', () => {
    // Arrange
    const employeeApiModel: apiModel.EmployeeSummary = null;

    // Act
    const result = mapEmployeeSummaryFromApiToVm(employeeApiModel);

    // Assert
    expect(result).toEqual({});
  });

  it("should return employees' view models when call to mapEmployeeSummaryListFromApiToVm", () => {
    // Arrange
    // spy
    const mapToCollectionSpyFn = jest.spyOn(Mappers, 'mapToCollection');

    // Act
    const result = mapEmployeeSummaryListFromApiToVm(mockEmployeesApiModel);

    // Assert
    expect(result).toEqual<viewModel.EmployeeSummary[]>(mockEmployeesVM);
    expect(mapToCollectionSpyFn).toHaveBeenCalled();
    expect(mapToCollectionSpyFn).toHaveBeenCalledWith(mockEmployeesApiModel, expect.any(Function));
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return empty array when call to mapEmployeeSummaryListFromApiToVm without employees", () => {
    // Arrange
    // spy
    const mapToCollectionSpyFn = jest.spyOn(Mappers, 'mapToCollection');

    // Act
    const result = mapEmployeeSummaryListFromApiToVm([]);

    // Assert
    expect(result).toStrictEqual([]);
    expect(mapToCollectionSpyFn).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return default values when the project does not exist (null)', () => {
    // Arrange
    const mockProject: apiModel.Project = null;

    // spy
    const createEmptyProjectSpyFn = jest.spyOn(viewModel, 'createEmptyProject');

    // Act
    const result = mapProjectFromApiToVm(mockProject);

    // Assert
    expect(createEmptyProjectSpyFn).toHaveBeenCalled();
    expect(result).toStrictEqual(viewModel.createEmptyProject());
  });

  it('should return default values when the project does not exist (undefined)', () => {
    // Arrange
    const mockProject: apiModel.Project = undefined;

    // spy
    const createEmptyProjectSpyFn = jest.spyOn(viewModel, 'createEmptyProject');

    // Act
    const result = mapProjectFromApiToVm(mockProject);

    // Assert
    expect(createEmptyProjectSpyFn).toHaveBeenCalled();
    expect(result).toStrictEqual(viewModel.createEmptyProject());
  });

  it("should return the project data and with the employees' view models when the project exist ", () => {
    // Arrange
    const mockProject: apiModel.Project = {
      id: '1',
      name: 'Nombre',
      isActive: true,
      comments: 'Comentario',
      externalId: '1234',
      employees: mockEmployeesApiModel
    };

    // Act
    const result = mapProjectFromApiToVm(mockProject);

    // Assert
    expect(result).toEqual<viewModel.Project>({
      ...mockProject,
      employees: mockEmployeesVM
    });
  });
});
