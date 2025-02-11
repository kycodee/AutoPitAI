# AutoPitAI

## Description  
AutoPitAI is a web application designed to help users identify and troubleshoot car issues. By selecting their car's year, make, and model, and typing a specific car part or problem that needs fixing, users receive an AI-generated list of tools, instructions, and parts required to resolve the issue. The app integrates with the OpenAI API for instructions and the NHTSA API for car data to ensure accurate and relevant information.

## Technologies Used  
- **Backend**: .NET Core, Entity Framework Core, SQL Server  
- **Frontend**: React, TypeScript, Axios, Bootstrap  
- **Instructions & Tools**: OpenAI API  
- **Car Data**: NHTSA API  
- **Development Tools**: ESLint, Prettier  

## Startup  
1. **Install dependencies**  
   ```bash
   npm install
2. **Set Up the Database**:
   - Ensure SQL Server is running.
   - Update your connection string in `appsettings.json` to point to your SQL Server instance.
   - Apply any migrations:
       ````dotnet ef database update````
3. **Run the Backend**:
   ````dotnet run````
4. **Start the Frontend**:
   ````npm start````

