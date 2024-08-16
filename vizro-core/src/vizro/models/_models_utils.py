import logging
from dataclasses import dataclass
from functools import wraps

from vizro.models.types import CapturedCallable, _SupportsCapturedCallable

logger = logging.getLogger(__name__)


def _log_call(method):
    @wraps(method)
    def _wrapper(self, *args, **kwargs):
        # We need to run method before logging so that @_log_call works for __init__.
        return_value = method(self, *args, **kwargs)
        logger.debug("Running %s.%s for model with id %s", self.__class__.__name__, method.__name__, self.id)
        return return_value

    return _wrapper


# Validators for reuse
def validate_min_length(cls, value):
    if not value:
        raise ValueError("Ensure this value has at least 1 item.")
    return value


def check_captured_callable(cls, value):
    if isinstance(value, CapturedCallable):
        captured_callable = value
    elif isinstance(value, _SupportsCapturedCallable):
        captured_callable = value._captured_callable
    else:
        return value

    raise ValueError(
        f"A callable of mode `{captured_callable._mode}` has been provided. Please wrap it inside "
        f"`{captured_callable._model_example}`."
    )


@dataclass
class PathReplacement:
    original: str
    new: str


REPLACEMENT_STRINGS = [
    PathReplacement("plotly.express", "px."),
    PathReplacement("vizro.tables", "vt."),
    PathReplacement("vizro.figures", "vf."),
    PathReplacement("vizro.actions", "va."),
    PathReplacement("vizro.charts", "vc."),
]
