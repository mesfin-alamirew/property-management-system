import { prisma } from '@/lib/prisma';

export async function getPhysicalVerifications() {
  return prisma.physicalVerification.findMany({
    orderBy: {
      createdAt: 'desc',
    },

    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      location: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      createdByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      _count: {
        select: {
          items: true,
          unregisteredObservations: true,
        },
      },
    },
  });
}

export async function getPhysicalVerificationById(id: string) {
  return prisma.physicalVerification.findUnique({
    where: {
      id,
    },

    include: {
      organizationUnit: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      location: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      createdByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      items: {
        orderBy: {
          expectedAssetName: 'asc',
        },

        include: {
          asset: {
            select: {
              id: true,
              assetCode: true,
              assetTag: true,
              name: true,
            },
          },

          verification: {
            select: {
              id: true,
              referenceNumber: true,
              title: true,
              status: true,
            },
          },

          verifiedByUser: {
            select: {
              id: true,
              username: true,
              displayName: true,
            },
          },
        },
      },

      unregisteredObservations: {
        orderBy: {
          observedAt: 'desc',
        },

        include: {
          observedByUser: {
            select: {
              id: true,
              username: true,
              displayName: true,
            },
          },

          registeredAsset: {
            select: {
              id: true,
              assetCode: true,
              assetTag: true,
              name: true,
            },
          },

          observedLocation: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },

          observedCondition: {
            select: {
              id: true,
              code: true,
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function getPhysicalVerificationItems(verificationId: string) {
  return prisma.physicalVerificationItem.findMany({
    where: {
      verificationId,
    },

    orderBy: {
      expectedAssetName: 'asc',
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      verifiedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function getPhysicalVerificationItemById(id: string) {
  return prisma.physicalVerificationItem.findUnique({
    where: {
      id,
    },

    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      verification: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
          status: true,
        },
      },

      verifiedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },
    },
  });
}

export async function getUnregisteredAssetObservations(verificationId: string) {
  return prisma.unregisteredAssetObservation.findMany({
    where: {
      verificationId,
    },

    orderBy: {
      observedAt: 'desc',
    },

    include: {
      observedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      observedLocation: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      observedCondition: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      registeredAsset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },
    },
  });
}

export async function getUnregisteredAssetObservationById(id: string) {
  return prisma.unregisteredAssetObservation.findUnique({
    where: {
      id,
    },

    include: {
      observedByUser: {
        select: {
          id: true,
          username: true,
          displayName: true,
        },
      },

      observedLocation: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      observedCondition: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      registeredAsset: {
        select: {
          id: true,
          assetCode: true,
          assetTag: true,
          name: true,
        },
      },

      verification: {
        select: {
          id: true,
          referenceNumber: true,
          title: true,
          status: true,
        },
      },
    },
  });
}

export async function getActiveOrganizationUnits() {
  return prisma.organizationUnit.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      code: true,
      name: true,
    },
  });
}

export async function getActiveAssetLocations() {
  return prisma.assetLocation.findMany({
    where: {
      isActive: true,
    },

    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      code: true,
      name: true,
    },
  });
}

export async function getAvailableAssetsForVerification() {
  return prisma.asset.findMany({
    orderBy: {
      name: 'asc',
    },

    select: {
      id: true,
      assetCode: true,
      assetTag: true,
      name: true,
      serialNumber: true,

      assetType: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      condition: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      location: {
        select: {
          id: true,
          code: true,
          name: true,
        },
      },

      assetAssignments: {
        where: {
          returnedAt: null,
        },

        orderBy: {
          assignedAt: 'desc',
        },

        take: 1,

        select: {
          employee: {
            select: {
              id: true,
              employeeNumber: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });
}
