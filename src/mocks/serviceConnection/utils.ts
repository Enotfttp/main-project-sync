import { IServiceConnectionList } from "@entities/serviceConnect";
import { fakerRU as faker } from "@faker-js/faker";

// Структурированная генерация по RKO с параметром количества
export const generateStructuredServiceConnections =
  (): IServiceConnectionList[] => {
    const connections: IServiceConnectionList[] = [];

    // Определяем RKO ID на основе количества
    const rkoIds = ["1", "2", "3", "4", "5"];
    const rkoConnections = rkoIds.map((rkoId, index) => ({
      rkoId,
      count:
        Math.floor(30 / rkoIds.length) + (index < 30 % rkoIds.length ? 1 : 0),
    }));

    const packages = [
      {
        id: "1",
        name: "Базовый аналитический пакет",
        option: "Базовые отчеты",
      },
      {
        id: "2",
        name: "Стандартный мониторинг",
        option: "Уведомления по email",
      },
      {
        id: "3",
        name: "Профессиональная аналитика",
        option: "Расширенная аналитика",
      },
      { id: "4", name: "Корпоративная платформа", option: "Интеграция с 1С" },
      { id: "5", name: "Премиум безопасность", option: "Аудит безопасности" },
    ];

    let globalId = 1;
    let contractCounter = 100;

    rkoConnections.forEach((rkoData) => {
      for (let i = 0; i < rkoData.count; i++) {
        const packageInfo = faker.helpers.arrayElement(packages);
        const conDate = faker.date.between({
          from: "2024-06-01",
          to: "2025-04-30",
        });

        const dateBeg = new Date(conDate);
        const dateEnd = new Date(dateBeg);
        dateEnd.setMonth(
          dateEnd.getMonth() + faker.number.int({ min: 1, max: 12 }),
        ); // от 1 до 12 месяцев

        // 20% подключений закрыты
        const isClosed = faker.datatype.boolean(0.2);
        const dateClose = isClosed
          ? new Date(
              dateEnd.getTime() +
                faker.number.int({ min: 0, max: 15 }) * 24 * 60 * 60 * 1000,
            ).toLocaleDateString("ru-RU")
          : dateEnd.toLocaleDateString("ru-RU");

        connections.push({
          id: String(globalId++),
          idRKO: rkoData.rkoId,
          idServiceContract: String(contractCounter++),
          idSrvPackage: packageInfo.id,
          conNumber: globalId - 1,
          conDate: conDate.toLocaleDateString("ru-RU"),
          srvPackages: packageInfo.name,
          srvOptions: packageInfo.option,
          dateBeg: dateBeg.toLocaleDateString("ru-RU"),
          dateEnd: dateEnd.toLocaleDateString("ru-RU"),
          dateClose: dateClose.toString(),
        });
      }
    });

    return connections;
  };
