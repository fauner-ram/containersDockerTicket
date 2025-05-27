# BoxTellingenceAppFrontEnd

BoxTelligence is a frontend application developed in Angular version 19.0.1 and node version 20.19.0 that enables the management of projects, clients, and data analysis related to boxes, packaging materials, and shipping costs. The application uses Ng Zorro for UI components and is designed to be intuitive and efficient.

## Development server

To start a local development server, run:

```bash
ng serve
```
## Table of Contents
- [Features](#Features)
- [Technologies Used](#Technologies-Used)
- [Project Structure](#Project-Structure)
- [Installation](#Installation)
- [Usage](#Usage)
- [Contributions](#Contributions)
- [License](#License)

## Features
- **Client Management**: Create, edit, and validate client data.
- **Project Management**: Listar proyectos nuevos, activos y antiguos, con detalles y análisis.
- **File Upload and Download**: Support for drag-and-drop files, format validation, and template downloads.
- **Data Analysis**: Presentation of cost improvements, volumes, and other key indicators.
- **Modern User Interface**: Based on **Ng Zorro**, with responsive design.

## Technologies Used
- **Angular**: Main framework for frontend development.
- **Ng Zorro**: UI component library based on Ant Design.
- **RxJS**: For handling asynchronous data streams.
- **SweetAlert2**: For displaying alerts and confirmations.

## Project Structure
```plaintext
box-telligence/
├── src/
│   ├── app/
│   │   ├── guards/                                      # Guards for service authentication
│   │   ├── modules/                                     # Public and Private components module
│   │   |   ├── private/                                 # Private components
|   │   │   |   ├── client-create/                       # Component for data creation and upload
|   │   │   |   ├── dashboards/                          # Component folder
|   |   │   │   |   ├── dashboards-detail/               # Detail component showing a card with a table of uploaded file names
|   |   │   │   |   ├── dashboards-detail-more/          # Component for analysis results of uploaded data
|   |   │   │   |   ├── dashboards-list/                 # Component receiving information on new, active, and old data 
|   |   │   │   |   ├── dashboards-news-save-data-file/  # Component for data creation and upload
│   │   |   ├── public/                                  # Public components   
|   │   │   |   ├── login/                               # Login component
│   │   ├── services/                                    # Services for business logic
|   │   │   ├── dashboards/                              # Service
|   │   │   ├── events-manager/                          # Reusable service for sending user ID
|   │   │   ├── info-box/                                # Service for consuming endpoints
|   │   │   ├── login/                                   # Service for login, obtaining token and expiration
|   │   │   ├── toast/                                   # Custom service for user notifications ("success or error")
│   │   ├── shared/                                      # Shared
│   │   |   ├── modals/                                  # Modals folder
|   │   │   |   ├── mistakes/                            # Modal for data upload errors
|   │   │   |   ├── success-modal/                       # Modal for successful data upload
│   │   ├── views/                                       # Views
│   │   |   ├── admin-layout/                            # View for sidebar configuration
│   │   ├── app-routing.module.ts
│   │   ├── app.module.ts
│   │   ├── ng-zorro.module.ts                           # Ng Zorro configuration module
│   ├── assets/                  # Static resources (images, styles)
│   ├── environments/            # Environment configurations
│   └── index.html
├── README.md
├── angular.json
├── package.json
├── tsconfig.json
└── ...
```

## Installation
Follow these steps to set up the project on your local machine:

1. Clone the repository:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd box-telligence
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open your browser at [http://localhost:4200](http://localhost:4200).

## Usage
1. Log in with your credentials.
2. Navigate through the available modules:
   - **Clients**: Create and manage clients.
   - **Project**: View and analyze projects.
   - **File Upload**: Upload and validate data.
3. Explore detailed analyses and available charts in the dashboards.

## Contributions
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a branch for your feature (git checkout -b feature/new-feature).
3. Make your changes and commit them (git commit -m "Added new feature").
4. ubmit a pull request.

## License
This project is licensed under the MIT License.

---
Thank you for using BoxTelligence! If you have any questions or suggestions, feel free to contact us.