/* eslint-disable complexity */

const controllerMethods = new Set(['Get', 'Post', 'Put', 'Delete', 'Patch']);
const decoratorTypes = new Set(['ClassDeclaration', 'MethodDefinition']);

module.exports = {
  create(context) {
    // собирает декораторы узла
    function getNodeDecorators(node) {
      return decoratorTypes.has(node.type) && node.decorators
        ? node.decorators
            .map(({ expression }) => expression.callee?.name)
            .filter(Boolean)
        : [];
    }

    // проверка на игнорирование метода
    function ignoreControllerMethod(node) {
      if (node.key.name === 'constructor') return true;

      const methodDecorators = getNodeDecorators(node);
      const parentDecorators = getNodeDecorators(node.parent.parent);

      // игнорировать, если это не метод @ApiController
      if (!parentDecorators.includes('ApiController')) return true;

      // игнорировать, если есть декоратор @AnyResponse
      if (methodDecorators.includes('AnyResponse')) return true;

      // игнорировать, если нет декоратора роутинга
      return !node.decorators?.some(({ expression }) =>
        controllerMethods.has(expression.callee?.name),
      );
    }

    // рекурсивный проход по описанию типа
    function isApiResponseType(typeAnnotation, level = 0) {
      if (level === 0 && typeAnnotation?.typeName?.name === 'Promise') {
        const typeArgument = typeAnnotation.typeArguments?.params[0];

        return isApiResponseType(typeArgument, level + 1);
      }

      if (typeAnnotation?.type === 'TSVoidKeyword') return true;

      return (
        typeAnnotation?.type === 'TSTypeReference' &&
        typeAnnotation.typeName?.name === 'ApiResponse'
      );
    }

    return {
      MethodDefinition(node) {
        if (ignoreControllerMethod(node)) return;

        if (!isApiResponseType(node.value.returnType?.typeAnnotation)) {
          const message = 'The return type must be "ApiResponse<T>" or "void"';

          context.report({ message, node });
        }
      },
    };
  },
};
